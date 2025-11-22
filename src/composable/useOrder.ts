import { ref } from "vue";
import type { Order } from "../models/Order";
import type { Food } from "../models/Food";
import { Customer } from "../models/Customer";

let nextOrderId = 1;
const orders = ref<Order[]>([]);
const selectedOrder = ref<Order | null>(null);

export function useOrder() {
  function createOrder(customer: Customer, food: Food[], note?: string): Order {
    const order = customer.placeOrder(nextOrderId++, food, note);
    orders.value.push(order);
    return order;
  }
  function openOrder(order: Order) {
    selectedOrder.value = order;
  }
  return {
    orders,
    selectedOrder,
    createOrder,
    openOrder,
  };
}
