import { Body, Controller, Post } from "@nestjs/common";
import { TechCreateDto } from "./dtos/TechCreate.dto";
import { TechDetailDto } from "./dtos/TechDetail.dto";

@Controller("tech")
export class TechController {
  @Post()
  addTech(@Body() request: TechCreateDto): TechDetailDto {
    return new TechDetailDto({
      name: request.name,
    });
  }
}
