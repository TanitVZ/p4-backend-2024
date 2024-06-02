import { expect, describe, vi, beforeEach, it } from "vitest"; // 👈🏻 Added the `vi` import
import db from "../src/__mocks__/db";

import  {createComissionsSocis, deleteSociById, updateSociById} from "../src/service";

import type { SociBodyUpdate, SociComissioBody } from "../src/schemas";
const sociData = {

    nom: "Arnau",
    cognoms: "Valls Bermúdez",
    dni: "55078681Y",
    email: "arnau.mer@gmail.com",
    actiu: true,
    dataAlta: new Date()
  
}


const sociComissioData: SociComissioBody = {
  sociId: 1,
  comissioId: [2, 3, 4],
};

const resultCreateComissio = {
  count: 3,
};

vi.mock("../src/db")


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



  describe('Test comissions', () => {
    beforeEach(() => {
      vi.resetAllMocks(); 
    });
  
    it('crea les comissions del soci', async () => {

 
      db.comissioSoci.createMany.mockResolvedValueOnce(resultCreateComissio); 
  
  
      const comissions = await createComissionsSocis(sociComissioData); 
  
      expect(comissions).toEqual(resultCreateComissio);
      expect(db.comissioSoci.createMany).toHaveBeenCalledTimes(1);
      expect(db.comissioSoci.createMany).toHaveBeenCalledWith( {
        data: [
          { comissioId : 2, sociId: 1},
          { comissioId : 3, sociId: 1},
          { comissioId : 4, sociId: 1},

        ]

      });
     
    });
  
   
  });


  describe("deleteSoci error", () => {

    it ("error al eliminar soci que no existeix", 
    async () => {

    db.soci.findUniqueOrThrow.mockImplementationOnce(() => {
        throw new Error(`Not found.`)

    })

    await expect(deleteSociById(50)).rejects.toThrowError(`Not found.`)

  })
}) ;








  






