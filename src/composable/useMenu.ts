import { ref, onMounted } from "vue";
import type { Food } from "../models/Food";
import foodData from "../data/food.json";

export function useMenu() {
  const food = ref<Food[]>([]);

  onMounted(() => {
    food.value = foodData as Food[];
  });

  return { food };
}
