<template>
  <v-data-table :headers="headers" :items="orders" class="elevation-1">
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.food="{ item }">
      <v-btn text color="primary" @click="open(item)">
        {{ item.food.name }}
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
/* global defineProps, defineEmits */
import type { Order } from "../models/Order";

defineProps<{ orders: Order[] }>();
const emit = defineEmits<{
  (e: "open-dialog", order: Order): void;
}>();

function open(order: Order) {
  emit("open-dialog", order);
}

const headers = [
  { text: "ID", value: "id" },
  { text: "Customer", value: "customer.name" },
  { text: "Food", value: "food" },
  { text: "Quantity", value: "quantity" },
];
</script>
<style scoped></style>
