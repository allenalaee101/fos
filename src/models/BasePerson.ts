export abstract class BasePerson {
  constructor(public id: number, public name: string) {}
  abstract getRole(): string;

  // Base person should be initiated and needs subclass for roles and inheritancs so its an class base componant
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