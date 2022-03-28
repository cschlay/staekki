import { Test, TestingModule } from "@nestjs/testing";
import { Database } from "../services/database.service";
import { ProjectService } from "./project.service";
import { EcosystemEnum } from "../enums/EcosystemEnum";
import { BadRequestException } from "@nestjs/common";
import { ProjectCreateDto } from "./dtos/ProjectCreate.dto";

const mockEcosystem = {
  id: 1,
  name: EcosystemEnum.NPM,
} as any;

describe("ProjectService", () => {
  let service: ProjectService;
  let db: Database;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService, Database],
    }).compile();

    db = module.get<Database>(Database);
    service = module.get<ProjectService>(ProjectService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("listProjectsAsync", () => {
    it("should paginate the results", async () => {
      const fx = [
        {
          id: "f0e4c346-71ab-4e04-bcc4-46cc8be5ed76",
          name: "P1",
          ecosystemId: 1,
          ecosystem: { id: 1, name: "npm" },
        },
        {
          id: "f0e4c346-71ab-4e04-bcc4-46cc8be5ed76",
          name: "P2",
          ecosystemId: 1,
          ecosystem: { id: 1, name: "npm" },
        },
      ];
      const mockFind = jest
        .spyOn(db.project, "findMany")
        .mockReturnValue(fx as any);

      const { data } = await service.listProjectsAsync();
      expect(data).toEqual([
        { id: fx[0].id, name: "P1", ecosystem: "npm" },
        { id: fx[1].id, name: "P2", ecosystem: "npm" },
      ]);
      expect(mockFind).toBeCalledWith({
        include: {
          ecosystem: true,
        },
      });
    });
  });

  describe("createProjectAsync", () => {
    it("should call database with correct parameters", async () => {
      const fx = {
        id: "a9c73258-7674-4dd8-99da-22fc79654b8a",
        name: "Test Project",
        ecosystem: EcosystemEnum.NPM,
      };

      const mockFindEcosystem = jest
        .spyOn(db.ecosystem, "findUnique")
        .mockReturnValue(mockEcosystem);
      const mockCreateProject = jest
        .spyOn(db.project, "create")
        .mockReturnValue(fx as any);

      const data = new ProjectCreateDto({
        name: fx.name,
        ecosystem: fx.ecosystem,
      });
      await expect(service.createProjectAsync(data)).resolves.toEqual(fx);
      expect(mockFindEcosystem).toBeCalledWith({
        where: {
          name: EcosystemEnum.NPM,
        },
      });
      expect(mockCreateProject).toBeCalledWith({
        data: {
          ecosystemId: 1,
          name: "Test Project",
        },
      });
    });

    it("should throw an error if ecosystem is not found", async () => {
      jest.spyOn(db.ecosystem, "findUnique").mockReturnValue(null);
      await expect(
        service.createProjectAsync({
          name: "Test Project",
          ecosystem: EcosystemEnum.NPM,
        })
      ).rejects.toEqual(
        new BadRequestException(null, "Ecosystem doesn't exist!")
      );
    });

    it("should throw an error if create fails", async () => {
      jest.spyOn(db.ecosystem, "findUnique").mockReturnValue(mockEcosystem);
      jest.spyOn(db.project, "create").mockImplementation(() => {
        throw new Error("Test: Unique Constraint");
      });

      await expect(
        service.createProjectAsync({
          name: "Test Project",
          ecosystem: EcosystemEnum.NPM,
        })
      ).rejects.toEqual(
        new BadRequestException(null, "A project with same name already exist!")
      );
    });
  });
});
