import { Max, Min } from "class-validator";
import { PG_MAX_INT } from "../../constants";

export class TechLinkCreateDto {
  @Min(0)
  @Max(PG_MAX_INT)
  techId: number;
}
