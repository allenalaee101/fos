<template>
  <v-card class="pa-4 mb-4">
    <v-card-title>Place an Order</v-card-title>
    <v-card-text>
      <v-select
        v-model="selectedFood"
        :items="food"
        item-text="name"
        item-value="id"
        label="Select Food"
      />
      <v-textarea v-model="notes" label="Notes (optional)" />
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="submitOrder">Order</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
/* global defineEmits */
import { ref } from "vue";
import { useMenu } from "../composable/useMenu";
import type { Food } from "../models/Food";

const emit = defineEmits<{
  (e: "order-created", payload: { food: Food[]; notes?: string }): void;
}>();

const { food } = useMenu();
const selectedFood = ref<number | null>(null);
const notes = ref<string>("");

function submitOrder() {
  if (!selectedFood.value) return;
  const selected = food.value.filter((f) => f.id === selectedFood.value);
  emit("order-created", { food: selected, notes: notes.value });
  selectedFood.value = null;
  notes.value = "";
}
</script>
