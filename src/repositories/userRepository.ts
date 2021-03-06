import { prisma } from "../database.js";
interface UserData {
  id: number;
  email: string;
  password: string;
}
async function userByEmail(email: string) {
  try {
    const results: any = await prisma.users.findMany({
      where: { email },
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

async function userById(id: number) {
  try {
    const results: any = await prisma.users.findFirst({
      where: { id: id },
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

async function newUser(name: string, email: string, password: string) {
  await prisma.users.create({
    data: {
      email: email,
      password: password,
      name: name,
    },
  });
}

async function truncate() {
  await prisma.$executeRaw`TRUNCATE TABLE users`;
}

const userRepository = { newUser, userByEmail, userById, truncate };

export default userRepository;
