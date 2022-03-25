import { Injectable } from "@nestjs/common";
import { Database } from "./services/database.service";

@Injectable()
export class AppService {
  private readonly db: Database;
  constructor(db: Database) {
    this.db = db;
  }

  getHello(): string {
    return "Hello World!";
  }
}
