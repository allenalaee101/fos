<template>
  <v-dialog v-model="model" max-width="500">
    <v-card v-if="order">
      <v-card-title>{{ order.food.name }}</v-card-title>
      <v-card-text>
        <p><strong>Type:</strong> {{ order.food.type }}</p>
        <p><strong>Price:</strong> {{ order.food.price }}</p>
        <p><strong>Description:</strong> {{ order.food.description }}</p>
        <p><strong>Customer:</strong> {{ order.customer.name }}</p>
        <p><strong>Notes:</strong> {{ order.notes || "None" }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary" @click="$emit('update:model-value', false)"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
/* global defineProps, defineEmits */
import { computed } from "vue";
import type { Order } from "../models/Order";

const props = defineProps<{ modelValue: boolean; order: Order | null }>();
const emit = defineEmits<{ (e: "update:model-value", value: boolean): void }>();

const model = computed<boolean>({
  get: () => props.modelValue,
  set: (v: boolean) => emit("update:model-value", v),
});
</script>
