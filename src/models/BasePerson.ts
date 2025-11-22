export abstract class BasePerson {
  constructor(public id: number, public name: string) {}
  abstract getRole(): string;

  // Optional: Customers place orders
  placeOrder(orderId: number, food: unknown, note?: string) {
    return {
      id: orderId,
      customer: this,
      food,
      quantity: 1,
      notes: note || "",
    };
  }
}
