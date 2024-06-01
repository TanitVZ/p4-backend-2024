import { expect, describe, vi, beforeEach, it } from "vitest"; // 👈🏻 Added the `vi` import
import db from "../src/__mocks__/db";

import  {deleteSoci} from "../src/service";

const sociData = {

    nom: "Arnau",
    cognoms: "Valls Bermúdez",
    dni: "55078681Y",
    email: "arnau.mer@gmail.com",
    actiu: true,
    dataAlta: new Date()
  
}
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

vi.mock("../src/db")

describe("serviceController", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("deleteSoci success", () => {
    it ("elimina el soci si existeix i retorna el soci eliminat", 
    async () => {
     
      db.soci.findUniqueOrThrow.mockResolvedValueOnce({ ...sociData, sociId: 1 })
      db.soci.delete.mockResolvedValueOnce({ ...sociData, sociId: 1 });

      const soci = await deleteSoci(1)
  
      expect(soci).toStrictEqual({ ...sociData, sociId: 1 });
    })

  }) ;


  
  describe("deleteSoci error", () => {
     
    it ("error al eliminar soci que no existeix", 
    async () => {
     
    db.soci.findUniqueOrThrow.mockImplementationOnce(() => {
        throw new Error(`Not found.`)

    })

  

    await expect(deleteSoci(50)).rejects.toThrowError(`Not found.`)

  })
}) ;



});
  






