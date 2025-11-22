<template>
  <v-form @submit.prevent="submitForm">
    <v-text-field v-model="customerName" label="Customer Name" required />

    <v-select
      v-model="selectedFood"
      :items="foods"
      item-title="name"
      item-value="id"
      label="Select Food"
      return-object
    />

    <v-textarea v-model="notes" label="Notes" />

    <v-btn type="submit" color="primary">Submit Order</v-btn>
  </v-form>
</template>

<script setup lang="ts">
/* global defineEmits */
import { ref } from "vue";
import { useMenu } from "../composable/useMenu";

const emit = defineEmits(["order-created"]);
const { foods } = useMenu();

const customerName = ref("");
const selectedFood = ref(null);
const notes = ref("");

function submitForm() {
  emit("order-created", {
    customerName: customerName.value,
    food: selectedFood.value,
    notes: notes.value,
  });
}
</script>
<style scoped></style>
