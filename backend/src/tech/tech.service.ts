import { Database } from "../services/database.service";
import { Injectable } from "@nestjs/common";
import { Tech } from "@prisma/client";

@Injectable()
export class TechService {
  constructor(private db: Database) {}

  /**
   * Returns the recommended technologies by some criteria.
   * @param projectId
   */
  async findSuggestions(projectId: string) {}

  /**
   * Lists the technologies by project.
   * @param projectId
   */
  async listTechAsync(projectId: string): Promise<Tech[]> {
    return await this.db.tech.findMany({
      where: {
        projects: {
          some: {
            projectId: projectId,
          },
        },
      },
    });
  }
}
