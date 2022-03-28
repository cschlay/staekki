import { BadRequestException, Injectable } from "@nestjs/common";
import { ProjectDetailDto } from "./dtos/ProjectDetail.dto";
import { ProjectCreateDto } from "./dtos/ProjectCreate.dto";
import { Database } from "../services/database.service";
import { EcosystemEnum } from "../enums/EcosystemEnum";
import { Paginated } from "../utils/Paginated";

@Injectable()
export class ProjectService {
  constructor(private db: Database) {}

  async listProjectsAsync(): Promise<Paginated<ProjectDetailDto>> {
    const results = await this.db.project.findMany({
      include: {
        ecosystem: true,
      },
    });
    const data: ProjectDetailDto[] = results.map(
      (instance) =>
        new ProjectDetailDto({
          id: instance.id,
          name: instance.name,
          ecosystem: instance.ecosystem.name as EcosystemEnum,
        })
    );
    return new Paginated<ProjectDetailDto>(data);
  }

  async createProjectAsync(data: ProjectCreateDto): Promise<ProjectDetailDto> {
    const ecosystem = await this.db.ecosystem.findUnique({
      where: {
        name: data.ecosystem,
      },
    });
    if (ecosystem === null) {
      throw new BadRequestException(null, "Ecosystem doesn't exist!");
    }

    let project;
    try {
      project = await this.db.project.create({
        data: {
          name: data.name,
          ecosystemId: ecosystem.id,
        },
      });
    } catch (e) {
      throw new BadRequestException(
        null,
        "A project with same name already exist!"
      );
    }

    return new ProjectDetailDto({
      id: project.id,
      name: project.name,
      ecosystem: ecosystem.name as EcosystemEnum,
    });
  }
}
