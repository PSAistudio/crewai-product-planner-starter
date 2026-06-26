import json
import sys
import time
import random
from http.server import BaseHTTPRequestHandler


ORDERS_KEY = "lottery_orders"


class handler(BaseHTTPRequestHandler):
    """POST /orders — create a lottery order; GET /orders — list all orders."""

    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body_bytes = self.rfile.read(content_length)
        try:
            body = json.loads(body_bytes) if body_bytes else {}
        except (json.JSONDecodeError, ValueError):
            self._respond(400, {"error": "Invalid JSON"})
            return

        items = body.get("items")
        if not items or not isinstance(items, list):
            self._respond(400, {"error": "Missing or invalid items"})
            return

        # Compute totals
        total_amount = sum(item.get("amount", 0) for item in items)
        total_payout = sum(item.get("payout", 0) for item in items)

        # Generate unique order ID
        order_id = f"ORD-{int(time.time())}-{random.randint(1000, 9999)}"

        order = {
            "id": order_id,
            "items": items,
            "totalAmount": total_amount,
            "totalPayout": total_payout,
            "createdAt": int(time.time() * 1000),
            "status": "confirmed",
        }

        try:
            store = self.context.agent.store
            # Read existing orders list
            existing_raw = store.get(ORDERS_KEY)
            existing_orders = json.loads(existing_raw) if existing_raw else []
        except Exception:
            existing_orders = []

        existing_orders.append(order)

        try:
            store.put(ORDERS_KEY, json.dumps(existing_orders))
        except Exception as e:
            print(f"[orders] store.put error: {e}", file=sys.stderr, flush=True)
            self._respond(500, {"error": "Failed to save order"})
            return

        self._respond(200, {"order": order})

    def do_GET(self):
        try:
            store = self.context.agent.store
            existing_raw = store.get(ORDERS_KEY)
            orders = json.loads(existing_raw) if existing_raw else []
        except Exception as e:
            print(f"[orders] store.get error: {e}", file=sys.stderr, flush=True)
            orders = []

        self._respond(200, {"orders": orders})

    def _respond(self, status: int, body: dict):
        payload = json.dumps(body).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)
