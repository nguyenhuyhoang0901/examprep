import { Timestamp } from "firebase/firestore";

export type Order = {
  id: string;
  providerId: string;
  examCode: string;
  expiresAt: Timestamp;
  status: string;
};

export function getLatestOrders(orders: Order[]) {
  const map = new Map<string, Order>();

  for (const order of orders) {
    const key = `${order.providerId}_${order.examCode}`;

    if (!map.has(key)) {
      map.set(key, order);
      continue;
    }

    const existing = map.get(key)!;

    if (
      order.expiresAt.toMillis() >
      existing.expiresAt.toMillis()
    ) {
      map.set(key, order);
    }
  }

  return Array.from(map.values());
}
