import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";
import { EcosystemEnum } from "../../enums/EcosystemEnum";

export class TechCreateDto {
  @Length(1, 10)
  name: string;

  @ApiProperty({ enum: EcosystemEnum })
  ecosystem: string;
}

export class TechCreateResponse {}
