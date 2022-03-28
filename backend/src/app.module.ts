import { Module } from "@nestjs/common";
import { Database } from "./services/database.service";
import { ProjectModule } from "./projects/project.module";
import { TechController } from "./tech/tech.controller";
import { TechModule } from "./tech/tech.module";

@Module({
  imports: [TechModule, ProjectModule],
  controllers: [TechController],
  providers: [Database],
})
export class AppModule {}
