import { ref, onMounted } from "vue";
import type { Food } from "../models/Food";
import foodsData from "../data/food.json";

export function useMenu() {
  const foods = ref<Food[]>([]);

  onMounted(() => {
    foods.value = foodsData as unknown as Food[];
  });

  return { foods };
}
