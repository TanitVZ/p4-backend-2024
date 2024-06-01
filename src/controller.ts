import { catchErrors } from "./errors";
import { send } from "./response";
import  { idParamSchema } from "./schemas";
import { deleteSoci } from "./service";

export const deleteQuota = catchErrors(async (req, res) => {
    const { id: sociId } = idParamSchema.parse(req.params);
const sociQuota = await deleteSoci(sociId)
send(res).ok(sociQuota);
}  
)   