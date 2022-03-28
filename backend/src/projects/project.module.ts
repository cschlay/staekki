import { Module } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectController } from "./project.controller";
import { Database } from "../services/database.service";

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, Database],
})
export class ProjectModule {}
