import { Router } from "express";
import { db } from "./db";
import { catchErrors } from "./errors";
import { send } from "./response";

import {
  idParamSchema,
  sociComissioBodySchema,
  sociQuotaBodySchema,
} from "./schemas";
//import { getAllSocis, getSociPerId } from "./controllers";
import * as SociController from "./serviceController";
const router = Router();

//SOCIS
router.get("/soci", SociController.getAllSocis);

router.get("/soci/:id", SociController.getSociById);

router.delete("/soci/:id", SociController.deleteSociById);

router.put("/soci/:id", SociController.updateSociById);

//QUOTES

router.get("/quotes", SociController.getAllQuotes);

router.post("/quotes", SociController.createSociAndQuota);

router.put("/quotes/:id", SociController.updateQuota);

//COMISSIONS

router.post("/comissio", SociController.createComissionsSocis);

router.get("/comissio", SociController.getAllComissions);

router.delete("/comissio/:id", SociController.deleteComissioById);

export default router;
