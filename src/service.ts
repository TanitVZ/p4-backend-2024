import db  from "./db";
import type {
  idParamSchema,
  sociComissioBodySchema,
  sociQuotaBodySchema,
} from "./schemas";

export const getAllSocis = async () =>  {
    const socis = await db.soci.findMany({
      orderBy: { cognoms: "asc" },
      select: {
        sociId: true,
        nom: true,
        dni: true,
        email: true, 
      }
    });
    return socis
  }


  export const getSociById = async (sociId :number) => {
   
    const soci = await db.soci.findUniqueOrThrow({ where: { sociId } });
    return soci;
  };

export const deleteSoci = async (sociId :number) => {
  
    await db.soci.findUniqueOrThrow({ where: { sociId } });

    const deletedSoci = await db.soci.delete({ where: { sociId } });
   
    return deletedSoci
}  

//export const createSociAndQuota = async (sociData : sociQuotaBodySchema)