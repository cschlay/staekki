import { EcosystemEnum } from "../../enums/EcosystemEnum";

export class ProjectDetailDto {
  id: string;
  name: string;
  ecosystem: EcosystemEnum;

  constructor(data: ProjectDetailDto) {
    Object.assign(this, data);
  }
}
