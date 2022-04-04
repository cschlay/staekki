import { Controller, Get, ParseUUIDPipe, Query } from "@nestjs/common";
import { Tech } from "@prisma/client";
import { TechService } from "./tech.service";

@Controller("techs")
export class TechController {
  constructor(private service: TechService) {}

  @Get()
  async listAsync(
    @Query("project", ParseUUIDPipe) projectId: string
  ): Promise<Tech[]> {
    return this.service.listTechAsync(projectId);
  }
}
