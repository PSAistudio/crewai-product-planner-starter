// --- Lottery Types ---

export type LotteryType = 'thai' | 'hanoi' | 'viet';

export interface OddsConfig {
  labelKey: string;       // i18n key for display name
  odds: number;           // multiplier (e.g. 80 means payout = amount * 80)
  numberLength: number;   // expected number of digits
}

export const LOTTERY_ODDS_CONFIG: Record<LotteryType, OddsConfig> = {
  thai: {
    labelKey: 'lottery.type.thai',
    odds: 80,
    numberLength: 6,
  },
  hanoi: {
    labelKey: 'lottery.type.hanoi',
    odds: 80,
    numberLength: 6,
  },
  viet: {
    labelKey: 'lottery.type.viet',
    odds: 80,
    numberLength: 6,
  },
};

export interface OrderItem {
  type: LotteryType;
  number: string;
  amount: number;
  odds: number;
  payout: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  totalPayout: number;
  createdAt: number;
  status: 'pending' | 'confirmed';
}

export interface PaymentChannel {
  name: string;
  account: string;
  qrUrl: string;
  instructions: string;
}

export type AppView = 'form' | 'payment' | 'confirmed';
