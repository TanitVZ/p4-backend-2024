import { catchErrors } from "./errors";
import { send } from "./response";
import {
  idParamSchema,
  quotaBodySchema,
  sociBodyUpdateSchema,
  sociComissioBodySchema,
  sociQuotaBodySchema,
} from "./schemas";
import * as SociService from "./service";

export const getAllSocis = catchErrors(async (req, res) => {
  const socis = await SociService.getAllSocis();
  send(res).ok(socis);
});

export const getSociById = catchErrors(async (req, res) => {
  // console.log(req.params)
  const { id: sociId } = idParamSchema.parse(req.params);
  const soci = await SociService.getSociById(sociId);
  send(res).ok(soci);
});

export const deleteSociById = catchErrors(async (req, res) => {
  const { id: sociId } = idParamSchema.parse(req.params);
  const sociQuota = await SociService.deleteSociById(sociId);
  send(res).ok(sociQuota);
});

export const updateSociById = catchErrors(async (req, res) => {
  const { id: sociId } = idParamSchema.parse(req.params);
  const sociData = sociBodyUpdateSchema.parse(req.body);
  console.log(sociData);
  const soci = await SociService.updateSociById(sociId, sociData);

  send(res).ok(soci);
});

export const getAllQuotes = catchErrors(async (req, res) => {
  const quotes = await SociService.getAllSocis();
  send(res).ok(quotes);
});

export const createSociAndQuota = catchErrors(async (req, res) => {
  const sociQuotaData = sociQuotaBodySchema.parse(req.body);
  const soci = await SociService.createSociAndQuota(sociQuotaData);

  send(res).createOk(soci);
});

export const updateQuota = catchErrors(async (req, res) => {
  const { id: quotaSociId } = idParamSchema.parse(req.params);
  const quotaData = quotaBodySchema.parse(req.body);
  const quota = await SociService.updateQuota(quotaSociId, quotaData);
  send(res).ok(quota);
});

export const createComissionsSocis = catchErrors(async (req, res) => {
  const sociComissioData = sociComissioBodySchema.parse(req.body);
  const sociComissio = await SociService.createComissionsSocis(
    sociComissioData
  );
  send(res).createOk(sociComissio);
});

export const getAllComissions = catchErrors(async (req, res) => {
  const comissions = await SociService.getAllComissions();
  send(res).ok(comissions);
});

export const deleteComissioById = catchErrors(async (req, res) => {
  const { id: comissioSocisId } = idParamSchema.parse(req.params);

  const deletedComissioSoci = await SociService.deleteComissioById(
    comissioSocisId
  );
  send(res).ok(deletedComissioSoci);
});

export const getSocisByQuotaId = catchErrors(async (req, res) => {
  const { id: quotaId } = idParamSchema.parse(req.params);

  const socis = await SociService.getSocisByQuotaId(
    quotaId
  );  
  send(res).ok(socis);
});
 