import { Database } from "../services/database.service";
import { Module } from "@nestjs/common";
import { TechController } from "./tech.controller";
import { TechService } from "./tech.service";

@Module({
  controllers: [TechController],
  providers: [Database, TechService],
})
export class TechModule {}
