import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Database } from "./services/database.service";
import { TechController } from './tech/tech.controller';
import { TechModule } from './tech/tech.module';

@Module({
  imports: [TechModule],
  controllers: [AppController, TechController],
  providers: [AppService, Database],
})
export class AppModule {}
