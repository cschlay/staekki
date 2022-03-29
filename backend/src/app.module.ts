import { Module } from "@nestjs/common";
import { Database } from "./services/database.service";
import { ProjectModule } from "./projects/project.module";
import { TechModule } from "./tech/tech.module";

@Module({
  imports: [TechModule, ProjectModule],
  controllers: [],
  providers: [Database],
})
export class AppModule {}
