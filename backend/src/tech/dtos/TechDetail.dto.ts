export class TechDetailDto {
  name: string;

  constructor(data: Partial<TechDetailDto>) {
    Object.assign(this, data);
  }
}
