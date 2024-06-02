import  db  from "./db";
import { catchErrors } from "./errors";
import { send } from "./response";
import {
  idParamSchema,
  sociComissioBodySchema,
  sociQuotaBodySchema,
} from "./schemas";

export const getAllSocis = catchErrors(async (req, res) => {
  const socis = await db.soci.findMany({
    orderBy: { cognoms: "asc" },
    select: {
      sociId: true,
      nom: true,
      dni: true,
      email: true,
    },
  });
  send(res).ok(socis);
});

export const getSociById = catchErrors(async (req, res) => {
  console.log(req.params); 
  const { id: sociId } = idParamSchema.parse(req.params);
  const soci = await db.soci.findUniqueOrThrow({ where: { sociId } });
  console.log(soci);
  //console.log(res);
  send(res).ok(soci);
});

export const deleteSociById = catchErrors(async (req, res) => {
  const { id: sociId } = idParamSchema.parse(req.params);

  await db.soci.findUniqueOrThrow({ where: { sociId } });

  const deletedSoci = await db.soci.delete({ where: { sociId } });
  send(res).ok(deletedSoci);
});

export const updateSociById = catchErrors(async (req, res) => {
  const { id: sociId } = idParamSchema.parse(req.params);

  await db.soci.findUniqueOrThrow({ where: { sociId } });

  const updateSoci = await db.soci.update({
    where: { sociId },
    data: {
      nom: req.body.nom || undefined,
      cognoms: req.body.cognoms || undefined,
      email: req.body.email || undefined,
    },
  });
  send(res).ok(updateSoci);
});

export const getAllQuotes = catchErrors(async (req, res) => {
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
  send(res).ok(quotes);
});

export const createSociAndQuota = catchErrors(async (req, res) => {
  const sociQuotaData = sociQuotaBodySchema.parse(req.body);
  const soci = await db.soci.create({
    data: {
      nom: sociQuotaData.nom,
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
  });

  send(res).createOk(soci);
});

export const updateQuota = catchErrors(async (req, res) => {
  const { id: quotaSociId } = idParamSchema.parse(req.params);

  await db.quotaSoci.findUniqueOrThrow({ where: { quotaSociId } });

  const updateQuota = await db.quotaSoci.update({
    where: { quotaSociId },
    data: {
      quantitat: req.body.quantitat || undefined,
      iban: req.body.iban || undefined,
      quotaId: req.body.quotaId || undefined,
    },
  });
  send(res).ok(updateQuota);
});

export const createComissionsSocis = catchErrors(async (req, res) => {
  const sociComissioData = sociComissioBodySchema.parse(req.body);
  const sociComissioDataMap = sociComissioData.comissioId.map((c) => ({
    comissioId: c,
    sociId: sociComissioData.sociId,
  }));

  const sociComissio = await db.comissioSoci.createMany({
    data: sociComissioDataMap,
  });
  send(res).createOk(sociComissio);
});

export const getAllComissions = catchErrors(async (req, res) => {
  const comissions = await db.comissioSoci.findMany({
    select: {
      soci: {
        select: {
          nom: true,
          cognoms: true,
        },
      },
      comissio: {
        select: {
          nom: true,
        },
      },
    },
  });
  send(res).ok(comissions);
});

export const deleteComissioById = catchErrors(async (req, res) => {
  const { id: comissioSocisId } = idParamSchema.parse(req.params);

  await db.comissioSoci.findUniqueOrThrow({ where: { comissioSocisId } });

  const deletedComissioSoci = await db.comissioSoci.delete({
    where: { comissioSocisId },
  });
  send(res).ok(deletedComissioSoci);
});
