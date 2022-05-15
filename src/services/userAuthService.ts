import { Users } from "@prisma/client";
import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository.js";
interface UpData {
  name: string;
  email: string;
  checkEmail?: string;
  password: string;
}

async function signUp(createUserData: UpData) {
  const { name, email, checkEmail, password } = createUserData;
  if (email !== checkEmail) {
    throw { code: 400, message: "Por favor, repita o e-mail corretamente" };
  }

  const user = await checkUser(email);
  if (user.length > 0) {
    throw {
      code: 409,
      message: "Já existe uma conta para esse e-mail! Por favor, faça login",
    };
  }
  console.log(name);
  try {
    await newUser(name, email, password);
  } catch (error) {
    throw {
      code: 444,
      message: "Algo deu errado! Tente novamente mais tarde",
    };
  }
}

async function checkUser(email: string) {
  const user = await userRepository.userByEmail(email);
  return user;
}

async function newUser(name: string, email: string, password: string) {
  const passwordHash = bcrypt.hashSync(password, 10);

  await userRepository.newUser(name, email, passwordHash);
}

export { signUp };
