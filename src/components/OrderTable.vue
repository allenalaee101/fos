<template>
  <v-data-table
    :headers="headers"
    :items="props.orders"
    item-value="id"
    @click:row="rowClicked"
  >
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.food="{ item }">
      <v-btn variant="text" @click.stop="open(item)">
        {{ item.food[0]?.name ?? "" }}
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
/* global defineProps, defineEmits */
import type { Order } from "../models/Order";
const props = defineProps<{ orders: Order[] }>();

const emit = defineEmits<{ (e: "open-dialog", order: Order): void }>();

const headers: { title: string; key: string }[] = [
  { title: "ID", key: "id" },
  { title: "Customer", key: "customer.name" },
  { title: "Food", key: "food" },
];

function open(order: Order) {
  emit("open-dialog", order);
}

function rowClicked(...args: unknown[]) {
  // Vuetify may pass different shapes: (event, item) or an object with `item`.
  let maybe: Order | undefined;
  if (args.length >= 2 && args[1]) {
    maybe = args[1] as Order;
  } else if (args.length >= 1) {
    const a0 = args[0] as unknown;
    if (typeof a0 === "object" && a0 !== null) {
      const obj = a0 as Record<string, unknown>;
      const candidate = Object.prototype.hasOwnProperty.call(obj, "item")
        ? obj["item"]
        : obj;
      maybe = candidate as Order | undefined;
    }
  }
  if (maybe) emit("open-dialog", maybe);
}
</script>
<style scoped></style>
