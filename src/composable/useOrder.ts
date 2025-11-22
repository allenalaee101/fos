import { ref, onMounted } from "vue";
import type { Order } from "../models/Order";
import type { Food } from "../models/Food";
import { Customer } from "../models/Customer";
import ordersData from "../data/order.json";

let nextOrderId = 100;

const orders = ref<Order[]>([]);
const selectedOrder = ref<Order | null>(null);

export function useOrder() {
  onMounted(() => {
    if (ordersData && ordersData.length) {
      // Convert JSON customer objects into Customer instances
      orders.value = ordersData.map((o) => ({
        id: nextOrderId++,
        customer: new Customer(o.customer.id, o.customer.name),
        food: o.food,
        quantity: o.quantity,
        notes: o.notes,
      }));
    }
  });

  function createOrder(
    customer: Customer,
    food: Food[],
    notes?: string
  ): Order {
    const first = food && food.length ? food[0] : (null as unknown as Food);
    // Use customer's placeOrder helper, then adjust quantity from the array
    const order = customer.placeOrder(nextOrderId++, first, notes) as Order;
    // If multiple items were passed, record quantity accordingly
    order.quantity = food?.length ?? 1;

    orders.value.push(order);
    return order;
  }

  function openOrder(order: Order) {
    selectedOrder.value = order;
  }

  return { orders, selectedOrder, createOrder, openOrder };
}
