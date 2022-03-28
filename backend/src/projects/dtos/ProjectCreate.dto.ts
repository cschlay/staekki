import { EcosystemEnum } from "../../enums/EcosystemEnum";
import { Length } from "class-validator";

export class ProjectCreateDto {
  @Length(1, 100)
  name: string;

  ecosystem: EcosystemEnum;

  constructor(data: ProjectCreateDto) {
    Object.assign(this, data);
  }
}
