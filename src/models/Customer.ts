import { BasePerson } from "./BasePerson";
import type { Food } from "./Food";
import type { Order } from "./Order";

export class Customer extends BasePerson {
  getRole(): string {
    return "Customer";
  }

  placeOrder(orderId: number, food: Food[], note?: string): Order {
    return {
      id: orderId,
      customerId: {
        id: this.id,
        name: this.name,
      },
      food,
      note,
    };
  }
}
