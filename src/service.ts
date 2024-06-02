import db  from "./db";
import type { SociBodyUpdate } from "./schemas";

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

export const deleteSociById = async (sociId :number) => {
  
    await db.soci.findUniqueOrThrow({ where: { sociId } });

    const deletedSoci = await db.soci.delete({ where: { sociId } });
   
    return deletedSoci
}  


export const updateSociById = async (sociId :number, sociData : SociBodyUpdate ) => {

await db.soci.findUniqueOrThrow({ where: { sociId } });

  const updateSoci = await db.soci.update({
    where: { sociId },
    data: {
      nom: sociData.nom ,
      cognoms: sociData.cognoms,
      email: sociData.email
    },
  });

  return updateSoci
}

//export const createSociAndQuota = async (sociData : sociQuotaBodySchema)