import * as request from "supertest";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { EcosystemEnum } from "../enums/EcosystemEnum";
import { Paginated } from "../utils/Paginated";
import { ProjectModule } from "./project.module";
import { ProjectService } from "./project.service";
import { ProjectDetailDto } from "./dtos/ProjectDetail.dto";

const id = "ec5de4e8-63da-415a-bae1-0bc545f300ac";
describe("API: Project", () => {
  let app: INestApplication;
  let projectService;

  beforeEach(async () => {
    projectService = {
      createProjectAsync: jest.fn(
        async (data) =>
          new ProjectDetailDto({
            id,
            ...data,
          })
      ),
      listProjectsAsync: jest.fn(() => new Paginated([])),
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProjectModule],
    })
      .overrideProvider(ProjectService)
      .useValue(projectService)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  describe("POST /projects", () => {
    it("should create if payload is valid", async () => {
      const name = "x".repeat(100);
      await request(app.getHttpServer())
        .post("/projects")
        .send({
          name,
          ecosystem: EcosystemEnum.NPM,
        })
        .expect(201, {
          id,
          name,
          ecosystem: EcosystemEnum.NPM,
        });
      expect(projectService.createProjectAsync).toBeCalled();
    });

    it("should throw error with invalid blank name", async () => {
      await request(app.getHttpServer())
        .post("/projects")
        .send({
          name: "",
          ecosystem: EcosystemEnum.NPM,
        })
        .expect(400);
      expect(projectService.createProjectAsync).not.toBeCalled();
    });

    it("should throw error if name is too long", async () => {
      await request(app.getHttpServer())
        .post("/projects")
        .send({
          name: "x".repeat(101),
          ecosystem: EcosystemEnum.NPM,
        })
        .expect(400);
      expect(projectService.createProjectAsync).not.toBeCalled();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
