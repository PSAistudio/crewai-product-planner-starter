import { useCallback, useEffect, useState } from 'react';
import { t, getLocaleName, toggleLang, onLangChange } from './i18n';
import { LotteryForm } from './components/LotteryForm';
import { PaymentInfo } from './components/PaymentInfo';
import type { OrderItem, AppView } from './types/lottery';

// --- App ---
export default function App() {
  const [view, setView] = useState<AppView>('form');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  // Force re-render on language change
  const [, setLangTick] = useState(0);
  useEffect(() => {
    return onLangChange(() => setLangTick((n) => n + 1));
  }, []);

  const handleProceed = useCallback(() => {
    setView('payment');
  }, []);

  const handleBack = useCallback(() => {
    setView('form');
  }, []);

  const handleConfirm = useCallback(() => {
    setView('confirmed');
  }, []);

  const handleNewOrder = useCallback(() => {
    setOrderItems([]);
    setView('form');
  }, []);

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      {/* Top Bar */}
      <header
        className="flex items-center justify-between px-5 flex-shrink-0"
        style={{
          height: 52,
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-secondary)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center"
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: 'linear-gradient(135deg, #5b93f5 0%, #7c3aed 100%)',
              fontSize: 12,
            }}
          >
            🎰
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            {t('lottery.appTitle')}
          </span>
        </div>

        <button
          onClick={toggleLang}
          className="cursor-pointer"
          style={{
            padding: '3px 10px',
            borderRadius: 6,
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--text-muted)',
            fontSize: 11,
            fontWeight: 500,
            fontFamily: 'inherit',
          }}
        >
          {t('lang.switch')}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto" style={{ background: 'var(--bg-primary)' }}>
        {view === 'form' && (
          <LotteryForm
            items={orderItems}
            onItemsChange={setOrderItems}
            onProceed={handleProceed}
          />
        )}

        {view === 'payment' && (
          <PaymentInfo
            items={orderItems}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        )}

        {view === 'confirmed' && (
          <div
            className="flex flex-col items-center justify-center h-full"
            style={{ padding: '0 24px' }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                background: 'linear-gradient(145deg, var(--bg-tertiary), var(--bg-elevated))',
                border: '1px solid var(--border-light)',
                fontSize: 36,
                marginBottom: 24,
                boxShadow: '0 4px 24px rgba(99, 150, 245, 0.08), 0 0 0 1px rgba(99, 150, 245, 0.05)',
              }}
            >
              ✅
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
              {t('lottery.confirm.title')}
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 400, marginBottom: 32 }}>
              {t('lottery.confirm.message')}
            </p>
            <button
              onClick={handleNewOrder}
              className="cursor-pointer"
              style={{
                padding: '12px 32px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: 'linear-gradient(135deg, #5b93f5 0%, #7c6bf5 100%)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'inherit',
                boxShadow: '0 2px 12px rgba(91, 147, 245, 0.25)',
              }}
            >
              {t('lottery.confirm.newOrder')}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
