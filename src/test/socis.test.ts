import { expect, test, describe, vi, beforeEach, it } from "vitest"; // 👈🏻 Added the `vi` import
import dbMock from "../__mocks__/db";
import * as SociController from "../serviceController";


const nouSoci = {
  nom: "Pepita",
  cognoms: "Perez Alonso",
  dni: "74945682K",
  email: "lpa@gmail.com",
  actiu: true,
  dataAlta: new Date(),
  quotaSoci: {
    quotaSociId: 1,
    quantitat: 50,
    iban: "ES7220953581368561352669",
    quotaId: 3,
  },
};

vi.mock("../src/db");

describe("serviceController", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });


  
  describe("createSociAndQuota", () => {
    it("retorna soci creat"),
      async () => {
        dbMock.soci.create.mockResolvedValueOnce({ ...nouSoci, sociId: 1 });

        const soci = await SociController.createSociAndQuota;
        expect(soci).toStrictEqual({ ...nouSoci, sociId: 1 });
      };
  });




});
