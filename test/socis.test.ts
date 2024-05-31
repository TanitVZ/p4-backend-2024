import { expect, test, vi } from "vitest"; // 👈🏻 Added the `vi` import
import db from "../src/__mocks__/db"

vi.mock('../src/db')

test("crear soci retorna id del soci i id de la quota", async () => {

  const nouSoci = {
    
    nom: "Pepita",
    cognoms: "Perez Alonso",
    dni: "74945682K",
    email: "lpa@gmail.com",
    actiu : true,
    dataAlta : new Date(),  
    quotaSoci: {
       quotaSociId: 1,
        quantitat: 50,
        iban: "ES7220953581368561352669",
        quotaId: 3,
      },
    }
  
  const nouSociData = {
    data: {
      nom: nouSoci.nom,
      cognoms: nouSoci.cognoms,
      dni: nouSoci.dni,
    
      quotaSoci: {
        create: {
          quantitat: nouSoci.quotaSoci.quantitat,
          iban: nouSoci.quotaSoci.iban,
          quotaId: nouSoci.quotaSoci.quotaId,
        },
      },
    },
    include: {
      quotaSoci: true,
    },
  };


  db.soci.create.mockResolvedValue({...nouSoci, sociId:1,});
  const soci = await db.soci.create(nouSociData);

  expect(soci).toStrictEqual({...nouSoci, sociId:1})
  
});
 