import { useState } from 'react';
import { t } from '../i18n';
import { LOTTERY_ODDS_CONFIG } from '../types/lottery';
import type { LotteryType, OrderItem, AppView } from '../types/lottery';

interface Props {
  items: OrderItem[];
  onItemsChange: (items: OrderItem[]) => void;
  onProceed: () => void;
}

const LOTTERY_TYPES: LotteryType[] = ['thai', 'hanoi', 'viet'];

export function LotteryForm({ items, onItemsChange, onProceed }: Props) {
  const [selectedType, setSelectedType] = useState<LotteryType>('thai');

  const config = LOTTERY_ODDS_CONFIG[selectedType];

  const addItem = () => {
    onItemsChange([
      ...items,
      { type: selectedType, number: '', amount: 0, odds: config.odds, payout: 0 },
    ]);
  };

  const removeItem = (index: number) => {
    onItemsChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: 'number' | 'amount', value: string) => {
    const updated = [...items];
    if (field === 'number') {
      updated[index] = { ...updated[index], number: value, type: selectedType, odds: config.odds };
    } else {
      const amount = parseFloat(value) || 0;
      updated[index] = { ...updated[index], amount, payout: amount * updated[index].odds, type: selectedType, odds: config.odds };
    }
    onItemsChange(updated);
  };

  const handleTypeChange = (newType: LotteryType) => {
    setSelectedType(newType);
    const newConfig = LOTTERY_ODDS_CONFIG[newType];
    onItemsChange(
      items.map((item) => ({
        ...item,
        type: newType,
        odds: newConfig.odds,
        payout: item.amount * newConfig.odds,
      }))
    );
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const totalPayout = items.reduce((sum, item) => sum + item.payout, 0);
  const isValid = items.length > 0 && items.every((item) => item.number.length === config.numberLength && item.amount > 0);

  return (
    <div className="flex flex-col h-full" style={{ gap: 24, padding: '32px 40px' }}>
      {/* Lottery type selector */}
      <div className="flex flex-col" style={{ gap: 10 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
          {t('lottery.form.typeLabel')}
        </label>
        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value as LotteryType)}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            fontSize: 13,
            fontFamily: 'inherit',
            outline: 'none',
          }}
        >
          {LOTTERY_TYPES.map((lt) => (
            <option key={lt} value={lt}>{t(LOTTERY_ODDS_CONFIG[lt].labelKey)}</option>
          ))}
        </select>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          {t('lottery.form.oddsInfo')} {config.odds}x — {t('lottery.form.digitsInfo')} {config.numberLength}
        </span>
      </div>

      {/* Order rows */}
      <div className="flex flex-col" style={{ gap: 12 }}>
        <div className="flex items-center" style={{ justifyContent: 'space-between' }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.2px' }}>
            {t('lottery.form.rowsLabel')}
          </label>
          <button
            onClick={addItem}
            className="cursor-pointer"
            style={{
              padding: '5px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-tertiary)',
              color: 'var(--accent-blue)',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'inherit',
            }}
          >
            + {t('lottery.form.addRow')}
          </button>
        </div>

        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: 24, color: 'var(--text-muted)', fontSize: 13 }}>
            {t('lottery.form.emptyRows')}
          </div>
        )}

        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center"
            style={{
              gap: 12,
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-light)',
              background: 'var(--bg-tertiary)',
            }}
          >
            {/* Number input */}
            <div className="flex flex-col" style={{ gap: 4, flex: 1 }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>
                {t('lottery.form.numberLabel')}
              </span>
              <input
                type="text"
                value={item.number}
                onChange={(e) => updateItem(index, 'number', e.target.value)}
                placeholder={`${config.numberLength} ${t('lottery.form.digitsPlaceholder')}`}
                maxLength={config.numberLength}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--border)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: 13,
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </div>

            {/* Amount input */}
            <div className="flex flex-col" style={{ gap: 4, flex: 1 }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>
                {t('lottery.form.amountLabel')}
              </span>
              <input
                type="number"
                value={item.amount || ''}
                onChange={(e) => updateItem(index, 'amount', e.target.value)}
                placeholder="0"
                min={0}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 6,
                  border: '1px solid var(--border)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: 13,
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </div>

            {/* Payout display */}
            <div className="flex flex-col" style={{ gap: 4, minWidth: 100 }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>
                {t('lottery.form.payoutLabel')}
              </span>
              <span style={{ fontSize: 13, color: 'var(--accent-green)', fontWeight: 600 }}>
                {item.payout.toLocaleString()}
              </span>
            </div>

            {/* Remove button */}
            <button
              onClick={() => removeItem(index)}
              style={{
                background: 'none',
                border: 'none',
                padding: '2px 6px',
                fontSize: 14,
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                borderRadius: 4,
              }}
              title={t('lottery.form.removeRow')}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      {items.length > 0 && (
        <div
          className="flex items-center"
          style={{
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
          }}
        >
          <div className="flex flex-col" style={{ gap: 2 }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
              {t('lottery.form.totalAmount')}
            </span>
            <span style={{ fontSize: 16, color: 'var(--text-primary)', fontWeight: 700 }}>
              {totalAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col" style={{ gap: 2 }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
              {t('lottery.form.totalPayout')}
            </span>
            <span style={{ fontSize: 16, color: 'var(--accent-green)', fontWeight: 700 }}>
              {totalPayout.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Proceed button */}
      <button
        onClick={onProceed}
        disabled={!isValid}
        className="cursor-pointer"
        style={{
          width: '100%',
          padding: '12px 0',
          borderRadius: 'var(--radius-sm)',
          border: 'none',
          background: isValid
            ? 'linear-gradient(135deg, #5b93f5 0%, #7c6bf5 100%)'
            : 'var(--bg-tertiary)',
          color: isValid ? '#fff' : 'var(--text-muted)',
          fontSize: 14,
          fontWeight: 600,
          fontFamily: 'inherit',
          opacity: isValid ? 1 : 0.5,
          cursor: isValid ? 'pointer' : 'not-allowed',
          boxShadow: isValid ? '0 2px 12px rgba(91, 147, 245, 0.25)' : 'none',
        }}
      >
        {t('lottery.form.proceed')}
      </button>
    </div>
  );
}
