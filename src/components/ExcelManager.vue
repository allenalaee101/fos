<template>
  <v-card class="pa-4">
    <v-card-title>Excel Import / Export</v-card-title>

    <v-card-text>
      <v-file-input
        label="Upload Excel"
        accept=".xlsx, .xls"
        @change="handleFileUpload"
      />
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="downloadExcel">Download Orders Excel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import * as XLSX from "xlsx";
import { useOrder } from "../composable/useOrder";
import { Customer } from "../models/Customer";
import { Food } from "../models/Food";

const { orders, createOrder } = useOrder();

/* --------------------------
   IMPORT EXCEL → REAL ORDERS
--------------------------- */
function handleFileUpload(event: any) {
  const file = Array.isArray(event) ? event[0] : event;
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const workbook = XLSX.read(e.target?.result, { type: "binary" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<any>(sheet);

    rows.forEach((row) => {
      // Auto-generate customer id
      const customer = new Customer(Date.now(), row.customerName);

      const food = new Food(
        Date.now(), // auto-generated food id
        row.foodName,
        row.type,
        row.price,
        row.description
      );

      createOrder(customer, [food], row.notes);
    });
  };

  reader.readAsBinaryString(file);
}

/* --------------------------
   EXPORT ORDERS → EXCEL
--------------------------- */
function downloadExcel() {
  const data = orders.value.map((o) => ({
    id: o.id,
    customerId: o.customer.id,
    customerName: o.customer.name,
    foodId: o.food[0].id,
    foodName: o.food[0].name,
    type: o.food[0].type,
    price: o.food[0].price,
    description: o.food[0].description,
    quantity: o.quantity,
    notes: o.notes || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  XLSX.writeFile(workbook, "orders.xlsx");
}
</script>
