import { useState } from 'react';
import { t } from '../i18n';
import { LOTTERY_ODDS_CONFIG } from '../types/lottery';
import type { OrderItem, AppView, PaymentChannel } from '../types/lottery';

interface Props {
  items: OrderItem[];
  onConfirm: () => void;
  onBack: () => void;
}

const PAYMENT_CHANNELS: PaymentChannel[] = [
  {
    name: 'PromptPay',
    account: '081-234-5678',
    qrUrl: '',
    instructions: '',
  },
  {
    name: 'Bank Transfer (KBANK)',
    account: '123-4-56789-0',
    qrUrl: '',
    instructions: '',
  },
];

export function PaymentInfo({ items, onConfirm, onBack }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const totalPayout = items.reduce((sum, item) => sum + item.payout, 0);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      onConfirm();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t('lottery.payment.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ gap: 24, padding: '32px 40px' }}>
      {/* Order summary */}
      <div className="flex flex-col" style={{ gap: 16 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)' }}>
          {t('lottery.payment.summaryTitle')}
        </h3>

        <div
          style={{
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
            overflow: 'hidden',
          }}
        >
          {/* Table header */}
          <div
            className="flex items-center"
            style={{
              padding: '10px 16px',
              borderBottom: '1px solid var(--border)',
              background: 'var(--bg-tertiary)',
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '1.2px',
              gap: 12,
            }}
          >
            <span style={{ flex: 1 }}>{t('lottery.form.typeLabel')}</span>
            <span style={{ flex: 1 }}>{t('lottery.form.numberLabel')}</span>
            <span style={{ flex: 1 }}>{t('lottery.form.amountLabel')}</span>
            <span style={{ flex: 1 }}>{t('lottery.form.payoutLabel')}</span>
          </div>

          {/* Table rows */}
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center"
              style={{
                padding: '10px 16px',
                borderBottom: i < items.length - 1 ? '1px solid var(--border-light)' : 'none',
                fontSize: 13,
                color: 'var(--text-primary)',
                gap: 12,
              }}
            >
              <span style={{ flex: 1 }}>{t(LOTTERY_ODDS_CONFIG[item.type].labelKey)}</span>
              <span style={{ flex: 1, fontWeight: 600 }}>{item.number}</span>
              <span style={{ flex: 1 }}>{item.amount.toLocaleString()}</span>
              <span style={{ flex: 1, color: 'var(--accent-green)', fontWeight: 600 }}>{item.payout.toLocaleString()}</span>
            </div>
          ))}

          {/* Totals row */}
          <div
            className="flex items-center"
            style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--border)',
              background: 'var(--bg-tertiary)',
              fontSize: 14,
              fontWeight: 700,
              color: 'var(--text-primary)',
              gap: 12,
            }}
          >
            <span style={{ flex: 2 }}>{t('lottery.form.totalAmount')}</span>
            <span style={{ flex: 1, textAlign: 'right' }}>{totalAmount.toLocaleString()}</span>
            <span style={{ flex: 1, textAlign: 'right', color: 'var(--accent-green)' }}>{totalPayout.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Payment channels */}
      <div className="flex flex-col" style={{ gap: 16 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)' }}>
          {t('lottery.payment.channelTitle')}
        </h3>

        {PAYMENT_CHANNELS.map((channel, i) => (
          <div
            key={i}
            className="flex flex-col"
            style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-tertiary)',
              gap: 6,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
              {channel.name}
            </span>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {t('lottery.payment.account')}: {channel.account}
            </span>
          </div>
        ))}
      </div>

      {/* Error message */}
      {submitError && (
        <div style={{ padding: '10px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-red)', background: 'rgba(239,68,68,0.1)', color: 'var(--accent-red)', fontSize: 13 }}>
          {submitError}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex" style={{ gap: 12 }}>
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="cursor-pointer"
          style={{
            flex: 1,
            padding: '12px 0',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'inherit',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {t('lottery.payment.back')}
        </button>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="cursor-pointer"
          style={{
            flex: 1,
            padding: '12px 0',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: isSubmitting
              ? 'var(--accent-amber)'
              : 'linear-gradient(135deg, #5b93f5 0%, #7c6bf5 100%)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'inherit',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            boxShadow: isSubmitting ? 'none' : '0 2px 12px rgba(91, 147, 245, 0.25)',
          }}
        >
          {isSubmitting ? t('lottery.payment.submitting') : t('lottery.payment.confirm')}
        </button>
      </div>
    </div>
  );
}
