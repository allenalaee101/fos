<template>
  <v-card class="pa-4">
    <v-card-title>Excel / CSV Import & Export</v-card-title>

    <v-card-text>
      <!-- Hidden file input -->
      <v-file-input ref="fileInput" accept=".xlsx,.xls,.csv" style="display: none"
        @update:model-value="handleFileUpload" />

      <!-- Upload button -->
      <v-btn color="primary" @click="triggerFileUpload">
        Import Excel / CSV File
      </v-btn>
    </v-card-text>
    <!-- Downlaod Button -->
    <v-card-actions>
      <v-btn color="primary" @click="downloadFile('xlsx')">
        Download Orders Excel
      </v-btn>
      <v-btn color="secondary" @click="downloadFile('csv')">
        Download Orders CSV
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as XLSX from "xlsx";
import { useOrder } from "../composable/useOrder";
import { Customer } from "../models/Customer";
import { Food } from "../models/Food";
import { VFileInput } from "vuetify/lib/components";

const fileInput = ref< VFileInput | null>(null);
const { orders, createOrder } = useOrder();

/* --------------------------
   Trigger hidden file input
--------------------------- */
function triggerFileUpload() {
  fileInput.value?.$el.querySelector('input[type="file"]')?.click();
}

/* --------------------------
   Import Excel or CSV
--------------------------- */
function handleFileUpload(file: File | File[] | null) {
  const blob = Array.isArray(file) ? file[0] : file;
  if (!blob || !(blob instanceof Blob)) {
    console.error("No valid file received:", blob);
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    let workbook: XLSX.WorkBook;

    const data = new Uint8Array(e.target?.result as ArrayBuffer);
    const ext = blob.name.split(".").pop()?.toLowerCase();

    if (ext === "csv") {
      // CSV
      const csvText = new TextDecoder().decode(data);
      const worksheet = XLSX.utils.sheet_to_json<any>(
        XLSX.read(csvText, { type: "string" }).Sheets.Sheet1,
        { defval: "" }
      );
      workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(worksheet), "Sheet1");
    } else {
      // XLSX / XLS
      workbook = XLSX.read(data, { type: "array" });
    }

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<any>(sheet, { defval: "" });

    console.log("Imported rows:", rows);

    const normalizedRows = rows.map(row => ({
      customerName: row.customerName || row["Customer Name"] || "",
      foodName: row.foodName || row["Food Name"] || "",
      type: row.type || row["Type"] || "",
      price: row.price || row["Price"] || 0,
      description: row.description || row["Description"] || "",
      notes: row.notes || row["Notes"] || "",
    }));

    normalizedRows.forEach(row => {
      const customer = new Customer(Date.now(), row.customerName);
      const food = new Food(Date.now(), row.foodName, row.type, row.price, row.description);
      createOrder(customer, [food], row.notes);
    });

    console.log("Orders after import:", orders.value);
  };

  if (Text === "csv") {
    // Read CSV as text
    reader.readAsArrayBuffer(blob);
  } else {
    // Read Excel as array buffer
    reader.readAsArrayBuffer(blob);
  }
}

/* --------------------------
   Export Excel or CSV
--------------------------- */
function downloadFile(format: "xlsx" | "csv") {
  const data = orders.value.map(o => ({
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

  if (format === "csv") {
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
    triggerBlobDownload(blob, "orders.csv")
  } else {
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
    const blob = new Blob([wbout], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
    XLSX.writeFile(workbook, "orders.xlsx");
    triggerBlobDownload(blob, "orders.xlsx")

  }
}
/*trigger BLOB DOWNLOAD SUNCTION */
function triggerBlobDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

</script>
