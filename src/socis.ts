import { Router } from "express";

import * as SociController from "./controller";
const router = Router();

//SOCIS
router.get("/soci", SociController.getAllSocis);

router.delete("/soci/:id", SociController.deleteSociById);

router.get("/soci/:id", SociController.getSociById);

router.put("/soci/:id", SociController.updateSociById);

router.get("/sociTipusQuotes/:id", SociController.getSocisByQuotaId);

//QUOTES
router.get("/quotes", SociController.getAllQuotes);

router.post("/quotes", SociController.createSociAndQuota);

router.put("/quotes/:id", SociController.updateQuota);


//COMISSIONS

router.post("/comissio", SociController.createComissionsSocis);

router.get("/comissio", SociController.getAllComissions);

router.delete("/comissio/:id", SociController.deleteComissioById);

export default router;
