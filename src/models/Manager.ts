import { BasePerson } from "./BasePerson";

export class Manager extends BasePerson {
  getRole(): string {
    return "Manager";
  }
}
