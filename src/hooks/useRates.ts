import { useState, useCallback } from 'react';
import type { Rates, StoredData } from '../types';

const STORAGE_KEY = 'mybank_rates';

const DEFAULT_RATES: Rates = {
  USD: { buy: 12600, sell: 12700 },
  EUR: { buy: 13750, sell: 13850 },
  RUB: { buy: 132,  sell: 138  },
};

function loadData(): StoredData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredData;
      // Eski format (number) yoki buzilgan ma'lumotni rad etamiz
      if (
        parsed?.rates?.USD &&
        typeof parsed.rates.USD === 'object' &&
        'buy' in parsed.rates.USD
      ) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  // Birinchi yuklash — updatedAt null (admin hali o'zgartirmagan)
  return { rates: DEFAULT_RATES, updatedAt: null };
}

export function useRates() {
  const [data, setData] = useState<StoredData>(loadData);

  const saveRates = useCallback((newRates: Rates) => {
    const newData: StoredData = {
      rates: newRates,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    setData(newData);
  }, []);

  return {
    rates: data.rates,
    updatedAt: data.updatedAt,
    saveRates,
  };
}
