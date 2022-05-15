import { Users } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
async function signIn(createUserData: UpData) {
  const { email, password } = createUserData;

  const user = await checkUser(email);
  if (user.length === 0) {
    throw {
      code: 401,
      message: "E-mail nâo cadastrado.\n Faça cadastro antes de logar!",
    };
  }
  await checkPassword(user[0].password, password);
  const token = await newSession(email);
}

async function checkUser(email: string) {
  const user = await userRepository.userByEmail(email);
  return user;
}

async function checkPassword(userPassword: string, password: string) {
  const checkPassword = bcrypt.compareSync(password, userPassword);
  if (!checkPassword) {
    throw {
      code: 401,
      message: "Não foi possível realizar login \n confira seus dados",
    };
  }
}
async function newUser(name: string, email: string, password: string) {
  const passwordHash = bcrypt.hashSync(password, 10);

  await userRepository.newUser(name, email, passwordHash);
}

async function newSession(email: string) {
  const passKey = process.env.JWT_SECRET as string;
  const token = jwt.sign(email, passKey);
  console.log(token);
  return token;
}

export { signUp, signIn };
