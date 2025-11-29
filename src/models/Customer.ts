import { BasePerson } from "./BasePerson";
export class Customer extends BasePerson {
  getRole(): string {
    return "Customer";
  }
}
/* eslint-disable */
// same as baseperson