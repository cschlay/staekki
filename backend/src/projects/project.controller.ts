import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectDetailDto } from "./dtos/ProjectDetail.dto";
import { ProjectCreateDto } from "./dtos/ProjectCreate.dto";
import { Paginated } from "../utils/Paginated";
import { TechLinkCreateDto } from "./dtos/TechLinkCreate.dto";

@Controller("projects")
export class ProjectController {
  constructor(private service: ProjectService) {}

  @Post()
  async createAsync(@Body() data: ProjectCreateDto): Promise<ProjectDetailDto> {
    return this.service.createProjectAsync(data);
  }

  @Get()
  async listAsync(): Promise<Paginated<ProjectDetailDto>> {
    return this.service.listProjectsAsync();
  }

  @Get(":id")
  async retrieveAsync(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<ProjectDetailDto> {
    return this.service.findByIdAsync(id);
  }

  @Delete(":id")
  async deleteAsync(@Param("id", ParseUUIDPipe) id: string): Promise<{}> {
    await this.service.deleteByIdAsync(id);
    return {};
  }

  @Post(":id/techs")
  async linkTechAsync(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: TechLinkCreateDto
  ): Promise<{}> {
    await this.service.linkTechAsync(id, data.techId);
    return {};
  }
}
