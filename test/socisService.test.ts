import { expect, describe, vi, beforeEach, it } from "vitest"; // 👈🏻 Added the `vi` import
import db from "../src/__mocks__/db";

import  {deleteSociById, updateSociById} from "../src/service";

import type { SociBodyUpdate } from "../src/schemas";
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

/*
describe("Test Socis", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
*/
  describe("Test socis", () => {
    beforeEach(() => {
      vi.resetAllMocks();
    });
  
    it ("elimina el soci si existeix i retorna el soci eliminat", 
    async () => {
      
      db.soci.findUniqueOrThrow.mockResolvedValueOnce({ ...sociData, sociId: 1 })
      db.soci.delete.mockResolvedValueOnce({ ...sociData, sociId: 1 });

      const soci = await deleteSociById(1)
    
      expect(soci).toStrictEqual({ ...sociData, sociId: 1 });
     
    })


    it ("modifica soci, retorna soci modificat", 
    async () => {
      
      db.soci.findUniqueOrThrow.mockResolvedValueOnce({ ...sociData, sociId: 1 })
      db.soci.update.mockResolvedValueOnce({ ...sociData, sociId: 1 });

      const soci = await updateSociById(1, {email: "mer@gmail.com"})
    
      expect(soci).toStrictEqual({ ...sociData, sociId: 1 });
     
    })

  }) ;



//}) ;







  






