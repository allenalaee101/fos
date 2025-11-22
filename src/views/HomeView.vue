<template>
  <v-container class="pa-4 fixed-container">
    <div v-if="!currentUser">
      <v-card class="pa-4" max-width="400">
        <v-card-title>Select Your Role</v-card-title>
        <v-card-text>
          <v-radio-group v-model="role" row>
            <v-radio label="Customer" value="Customer" />
            <v-radio label="Employee" value="Employee" />
            <v-radio label="Manager" value="Manager" />
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="selectRole">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <div v-else>
      <OrderForm
        v-if="currentUser.getRole() === 'Customer'"
        @order-created="addOrder"
      />
      <OrderTable
        v-if="currentUser.getRole() !== 'Customer'"
        :orders="orders"
        @open-dialog="openDialog"
      />
      <OrderDialog
        :model-value="dialog"
        :order="selectedOrder"
        @update:model-value="dialog = $event"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Customer } from "../models/Customer";
import { Employee } from "../models/Employee";
import { Manager } from "../models/Manager";
import { useOrder } from "../composable/useOrder";
import type { Food } from "../models/Food";
import type { Order } from "../models/Order";

import OrderForm from "../components/OrderForm.vue";
import OrderTable from "../components/OrderTable.vue";
import OrderDialog from "../components/OrderDialog.vue";

const { orders, selectedOrder, createOrder, openOrder } = useOrder();
const dialog = ref(false);

const role = ref<string>("");
const currentUser = ref<Customer | Employee | Manager | null>(null);

function selectRole() {
  switch (role.value) {
    case "Customer":
      currentUser.value = new Customer(Date.now(), "Guest Customer");
      break;
    case "Employee":
      currentUser.value = new Employee(Date.now(), "Employee");
      break;
    case "Manager":
      currentUser.value = new Manager(Date.now(), "Manager");
      break;
  }
}

type NewOrderPayload = { food: Food[]; notes?: string };

function isCustomer(u: Customer | Employee | Manager | null): u is Customer {
  return !!u && u instanceof Customer;
}

function addOrder(payload: NewOrderPayload) {
  const user = currentUser.value;
  if (!user) return;
  if (!isCustomer(user)) {
    console.warn("Only customers can create orders");
    return;
  }
  createOrder(user, payload.food, payload.notes);
}

function openDialog(order: Order) {
  openOrder(order);
  dialog.value = true;
}
</script>
<style scoped>
.fixed-container {
  min-height: 500px;
  max-height: 1000px; /* optional */
}
</style>
