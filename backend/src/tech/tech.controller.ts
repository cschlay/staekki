import { Body, Controller, Post } from "@nestjs/common";
import { TechCreateReq } from "./dtos/tech.dto";

@Controller("tech")
export class TechController {
  @Post()
  addTech(@Body() data: TechCreateReq): string {
    return "OK!";
  }
}
