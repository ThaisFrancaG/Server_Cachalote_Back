import { prisma } from "../database.js";
import {
  ProfilePreferences,
  NotificationsPreferences,
} from "../services/userDetailsService.js";
interface UserData {
  id: number;
  email: string;
  password: string;
}
async function profilePreferencesById(id: number) {

  try {
    const results: any = await prisma.userPreferences.findFirst({
      where: { userId: id },
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

async function notificationsPreferencesById(id: number) {

  try {
    const results: any = await prisma.userNotifications.findFirst({
      where: { userId: id },
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

async function createProfilePreferences(data: ProfilePreferences) {
  try {
    await prisma.userPreferences.create({
      data: data,
    });
  } catch (error) {
    console.log(error);
    throw {
      code: 503,
      message:
        "Parece que estamos com problemas no servidor. Tente novamente mais tarde!",
    };
  }
}

async function createNotificationsPreferences(data: NotificationsPreferences) {

 
  try {
    await prisma.userNotifications.create({
      data: data,
    });
  } catch (error) {
    console.log(error);
    throw {
      code: 503,
      message:
        "Parece que estamos com problemas no servidor. Tente novamente mais tarde!",
    };
  }
}

const preferencesRepository = {
  profilePreferencesById,
  notificationsPreferencesById,
  createProfilePreferences,
  createNotificationsPreferences,
};
export default preferencesRepository;
