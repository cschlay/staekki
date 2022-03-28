export class Paginated<T> {
  data: T[];

  constructor(data: T[]) {
    this.data = data;
  }
}
