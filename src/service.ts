import db  from "./db";


export const deleteSoci = async (sociId :number) => {
    console.log("entro 1")
    await db.soci.findUniqueOrThrow({ where: { sociId } });

    const deletedSoci = await db.soci.delete({ where: { sociId } });
   
    return deletedSoci
}  