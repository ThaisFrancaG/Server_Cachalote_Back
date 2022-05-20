import { prisma } from "../database.js";
interface UserData {
  id: number;
  email: string;
  password: string;
}
async function preferencesById(id: number) {
  try {
    const results: any = await prisma.userPreferences.findFirst({
      where: { userID: id },
    });
    return results;
  } catch (error) {
    console.log(error);
    throw {
      code: 503,
      message:
        "Parece que estamos com problemas no servidor. Tente novamente mais tarde!",
    };
  }
}
const preferencesRepository = { preferencesById };
export default preferencesRepository;
