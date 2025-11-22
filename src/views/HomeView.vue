<template>
  <v-container class="pa-4">
    <OrderForm @order-created="addOrder" />

    <OrderTable :orders="orders" @open-dialog="openDialog" />

    <OrderDialog :model-value="dialog" :order="selectedOrder" @update:modelValue="dialog = $event" />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useOrder } from "../composable/useOrder";
import { Customer } from "../models/Customer";
import type { Food } from "../models/Food";
import type { Order } from "../models/Order";

import OrderForm from "../components/FoodOrderForm.vue";
import OrderTable from "../components/OrderTable.vue";
import OrderDialog from "../components/OrderDialog.vue";

const { orders, selectedOrder, createOrder, openOrder } = useOrder();

const dialog = ref(false);

type NewOrderPayload = { customerName: string; food: Food[]; notes?: string };

function addOrder(payload: NewOrderPayload) {
  const customer = new Customer(Date.now(), payload.customerName);
  createOrder(customer, payload.food, payload.notes);
}

function openDialog(order: Order) {
  openOrder(order);
  dialog.value = true;
}
console.log("HomeView loaded");
</script>
