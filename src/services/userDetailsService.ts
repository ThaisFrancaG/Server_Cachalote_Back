import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import preferencesRepository from "../repositories/userPreferencesRepository.js";

async function userData(token: string) {
  console.log("chegou no service");
  try {
    const passKey = process.env.JWT_SECRET as string;

    const { email } = jwt.verify(token, passKey) as { email: string };

    const getUser = await userRepository.userByEmail(email);
    const userId = getUser[0].id;
    const getPreferences = await preferencesRepository.preferencesById(userId);

    const userInfo = {
      id: userId,
      nickName: getPreferences === null ? "" : getPreferences.nickName,
      avatar: getPreferences === null ? "" : getPreferences.avatar,
    };
    return userInfo;
  } catch (error) {
    console.log(error);
    throw {
      code: 444,
      message: "Algo deu errado! Tente novamente mais tarde",
    };
  }
}

export { userData };
