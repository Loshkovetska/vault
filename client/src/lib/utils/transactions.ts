import { Transaction } from '../types/transaction';
import { dateFormate } from './date';

export function activityListFormate(transactions: Transaction[]) {
  const dates = Array.from(
    new Set(
      (transactions ?? []).map(f => new Date(f.created_at).toDateString()),
    ),
  );
  const res = [];
  for (let i = 0; i < dates.length; i++) {
    res.push({
      title: dateFormate(new Date(dates[i])),
      data: (transactions ?? []).filter(
        c => new Date(c.created_at).toDateString() === dates[i],
      ),
    });
  }
  return res;
}

export function activityChartFormate(transactions: Transaction[]) {
  const dates = Array.from(
    new Set((transactions ?? []).map(f => f.created_at)),
  );
  const res = [];
  for (let i = 0; i < dates.length; i++) {
    const total = (transactions ?? [])
      .filter(c => c.created_at === dates[i])
      .reduce((prev, cur) => prev + cur.amount, 0);

    res.push({
      date: dateFormate(new Date(dates[i])),
      total,
    });
  }
  return res;
}
