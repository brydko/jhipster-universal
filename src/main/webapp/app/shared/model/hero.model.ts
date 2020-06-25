export interface IHero {
  id?: string;
  name?: string;
}

export class Hero implements IHero {
  constructor(public id?: string, public name?: string) {}
}
