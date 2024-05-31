import { expect, test, vi } from "vitest"; // 👈🏻 Added the `vi` import
import { db } from "../src/db";


test("crear soci retorna id del soci i id de la quota", async () => {
  const nouSoci = {
    data: {
      nom: "Laura",
      cognoms: "Perez Alonso",
      dni: "74945682K",
      email: "lpa@gmail.com",

      quotaSoci: {
        create: {
          quantitat: 50,
          iban: "ES7220953581368561352669",
          quotaId: 3,
        },
      },
    },
    include: {
      quotaSoci: true,
    },
  };
  const soci = await db.soci.create(nouSoci);
  expect(soci.sociId).toBeDefined();
  expect(soci.quotaSoci?.quotaId).toBeDefined();
  expect(soci.actiu).toBe(true);
});
