import {
  Controller,
  Get,
  ParseBoolPipe,
  ParseUUIDPipe,
  Query,
} from "@nestjs/common";
import { Tech } from "@prisma/client";
import { TechService } from "./tech.service";

@Controller("techs")
export class TechController {
  constructor(private service: TechService) {}

  @Get()
  async listAsync(
    @Query("project", ParseUUIDPipe) projectId: string,
    @Query("suggestions", ParseBoolPipe) suggestions?: boolean
  ): Promise<Tech[]> {
    if (suggestions) {
      return this.service.findSuggestions(projectId);
    }
    return this.service.listTechAsync(projectId);
  }
}
