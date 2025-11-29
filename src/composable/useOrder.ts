import { ref, onMounted } from "vue";
import type { Order } from "../models/Order";
import type { Food } from "../models/Food"; // only as type
import { Customer } from "../models/Customer";
import ordersData from "../data/order.json";

let nextOrderId = 100;

const orders = ref<Order[]>([]);
const selectedOrder = ref<Order | null>(null);

export function useOrder() {
  onMounted(() => {
    if (ordersData && ordersData.length) {
      orders.value = ordersData.map((o) => {
        const foods: Food[] = Array.isArray(o.food) ? o.food : [o.food];

        return {
          id: nextOrderId++,
          customer: new Customer(o.customer.id, o.customer.name),
          food: foods.map((f: Food) => ({
            id: f.id,
            name: f.name,
            type: f.type,
            price: f.price,
            description: f.description,
          })),
          quantity: o.quantity,
          notes: o.notes,
        } as Order;
      });
    }
  });

  function createOrder(customer: Customer, foods: Food[], notes?: string): Order {
    if (!foods || foods.length === 0) throw new Error("Order must have at least one food item");

    const order: Order = {
      id: nextOrderId++,
      customer,
      food: foods,
      quantity: foods.length,
      notes: notes || "",
    };

    orders.value.push(order);
    return order;
  }

  function openOrder(order: Order) {
    selectedOrder.value = order;
  }

  return { orders, selectedOrder, createOrder, openOrder };
}
