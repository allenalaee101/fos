import { BasePerson } from "./BasePerson";

export class Employee extends BasePerson {
  getRole(): string {
    return "Employee";
  }
}
