import type { Food } from "./Food";
import type { BasePerson } from "./BasePerson";

export interface Order {
  id: number;
  customer: BasePerson;
  food: Food[];
  quantity: number;
  notes?: string;
}
