import OrdersSubscriptionsList from "@/components/subscriptions/OrdersSubscriptionsList";

export default function SubscriptionsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        My Subscriptions
      </h1>

      <OrdersSubscriptionsList />
    </div>
  );
}
