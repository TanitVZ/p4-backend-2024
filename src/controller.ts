import { catchErrors } from "./errors";
import { send } from "./response";
import  { idParamSchema } from "./schemas";
import * as SociService from "./service";


 

export const getAllSocis = catchErrors(async (req, res) => {
    const socis = await SociService.getAllSocis()
    send(res).ok(socis);
  }); 


  export const getSociById = catchErrors(async (req, res) => {
   // console.log(req.params)
    const { id: sociId } = idParamSchema.parse(req.params);
    const soci = await SociService.getSociById(sociId)
    send(res).ok(soci);
  });


export const deleteSoci = catchErrors(async (req, res) => {
    const { id: sociId } = idParamSchema.parse(req.params);
const sociQuota = await SociService.deleteSoci(sociId)
send(res).ok(sociQuota);
}  
)   