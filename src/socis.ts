import { Router } from "express";

//import * as SociController from "./serviceController";
import * as SociController from "./controller";
const router = Router();
  
//SOCIS
router.get("/soci", SociController.getAllSocis);

router.delete("/soci/:id", SociController.deleteSoci);

router.get("/soci/:id", SociController.getSociById);



//router.put("/soci/:id", SociController.updateSociById);

//QUOTES

//router.get("/quotes", SociController.getAllQuotes);

//router.post("/quotes", SociController.createSociAndQuota);

//router.put("/quotes/:id", SociController.updateQuota);

//COMISSIONS

//router.post("/comissio", SociController.createComissionsSocis);

//router.get("/comissio", SociController.getAllComissions);

//router.delete("/comissio/:id", SociController.deleteComissioById);

//PROVA NOVA
//router.delete("/borroSoci/:id", deleteQuota)

export default router;
