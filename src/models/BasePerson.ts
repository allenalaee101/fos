export abstract class BasePerson {
  constructor(public id: number, public name: string) {}

  getdisplayName(): string {
    return `ID: ${this.id}, Name: ${this.name}`;
  }
  abstract getRole(): string;
}
