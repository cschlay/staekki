import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectDetailDto } from "./dtos/ProjectDetail.dto";
import { ProjectCreateDto } from "./dtos/ProjectCreate.dto";
import { Paginated } from "../utils/Paginated";

@Controller("projects")
export class ProjectController {
  constructor(private service: ProjectService) {}

  @Get()
  listAsync(): Promise<Paginated<ProjectDetailDto>> {
    return this.service.listProjectsAsync();
  }

  @Post()
  async createAsync(@Body() data: ProjectCreateDto): Promise<ProjectDetailDto> {
    return this.service.createProjectAsync(data);
  }
}
