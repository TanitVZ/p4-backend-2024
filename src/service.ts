import db from "./db";
import type { QuotaBody, SociBodyUpdate, SociQuotaBody } from "./schemas";

export const getAllSocis = async () => {
  const socis = await db.soci.findMany({
    orderBy: { cognoms: "asc" },
    select: {
      sociId: true,
      nom: true,
      dni: true,
      email: true,
    },
  });
  return socis;
};

export const getSociById = async (sociId: number) => {
  const soci = await db.soci.findUniqueOrThrow({ where: { sociId } });
  return soci;
};

export const deleteSociById = async (sociId: number) => {
  await db.soci.findUniqueOrThrow({ where: { sociId } });

  const deletedSoci = await db.soci.delete({ where: { sociId } });

  return deletedSoci;
};

export const updateSociById = async (
  sociId: number,
  sociData: SociBodyUpdate
) => {
  await db.soci.findUniqueOrThrow({ where: { sociId } });

  const updateSoci = await db.soci.update({
    where: { sociId },
    data: {
      nom: sociData.nom,
      cognoms: sociData.cognoms,
      email: sociData.email,
    },
  });

  return updateSoci;
};

export const getAllQuotes = async () => {
  const quotes = await db.quotaSoci.findMany({
    select: {
      quotaSociId: true,
      soci: {
        select: {
          nom: true,
          cognoms: true,
        },
      },
      quantitat: true,
      iban: true,
      quota: {
        select: {
          nom: true,
        },
      },
    },
  });

  return quotes;
};



export const createSociAndQuota = async (sociQuotaData: SociQuotaBody) => {
  
  const soci = await db.soci.create({
    data: {
      nom: sociQuotaData.nom ,
      cognoms: sociQuotaData.cognoms,
      dni: sociQuotaData.dni,
      email: sociQuotaData.email,

      quotaSoci: {
        create: {
          quantitat: sociQuotaData.quotaSoci.quantitat,
          iban: sociQuotaData.quotaSoci.iban,
          quotaId: sociQuotaData.quotaSoci.quotaId,
        },
      },
    },
    include: {
      quotaSoci: true,
    },
  }
  )
  return soci;
}


export const updateQuota = (async ( quotaSociId: number,
  quotaData: QuotaBody) => {
 

  await db.quotaSoci.findUniqueOrThrow({ where: { quotaSociId } });

  const quota = await db.quotaSoci.update({
    where: { quotaSociId },
    data: {
      quantitat: quotaData.quantitat,
      iban : quotaData.iban,
      quotaId : quotaData.quotaId
    },
  });
    return quota
});


//export const createSociAndQuota = async (sociData : sociQuotaBodySchema)
