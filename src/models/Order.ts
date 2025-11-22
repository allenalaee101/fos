import { Food } from "./Food";

export interface Order {
  id: number;
  customerId: { id: number; name: string };
  food: Food[];
  note?: string;
}
