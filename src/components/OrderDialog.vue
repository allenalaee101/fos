<template>
  <v-dialog v-model="model" max-width="500">
    <v-card v-if="order">
      <v-card-title>{{ firstFood ? firstFood.name : "No items" }}</v-card-title>
      <v-card-text>
        <p><strong>Customer:</strong> {{ customerName }}</p>
        <p><strong>Type:</strong> {{ firstFood ? firstFood.type : "" }}</p>
        <p><strong>Price:</strong> {{ firstFood ? firstFood.price : "" }}</p>
        <p><strong>Notes:</strong> {{ note }}</p>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="model = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
/* global defineProps, defineEmits */
import { computed, toRef } from "vue";
import type { Order } from "../models/Order";

const props = defineProps<{ modelValue: boolean; order?: Order | null }>();

const emit = defineEmits(["update:modelValue"]);

const order = toRef(props, "order");

const model = computed({
  get: () => props.modelValue,
  set: (visu: boolean) => emit("update:modelValue", visu),
});

const firstFood = computed(() => order.value?.food?.[0] ?? null);
const customerName = computed(() => order.value?.customerId?.name ?? "");
const note = computed(() => order.value?.note ?? "");
</script>

<style scoped></style>
