import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository.js";
import preferencesRepository from "../repositories/userPreferencesRepository.js";

interface UserPreferences {
  nickname?: string;
  avatar?: string;
  books?: boolean;
  mangas?: boolean;
  novels?: boolean;
  comics?: boolean;
  showPublicNotifications?: boolean;
  showFriendsNotifications?: boolean;
  getPublicNotifications?: boolean;
  getFriendsNotifications?: boolean;
}

interface ProfilePreferences {
  userId: number;
  avatar?: string;
  nickName?: string;
  likesBooks?: boolean;
  likesNovels?: boolean;
  likesManga?: boolean;
  likesComics?: boolean;
}

const badRequest = {
  code: 400,
  message: "Algo deu errado! \n Confira seus dados",
};

interface NotificationsPreferences {
  userId: number;
  showPublic?: boolean;
  showFriends?: boolean;
  getPublic?: boolean;
  getFriends?: boolean;
}
async function profilePreferences(
  token: string,
  userPreferences: UserPreferences
) {
  const userInfo = await userData(token);
  const userId = userInfo.id;
  let { nickname, avatar, books, mangas, novels, comics } = userPreferences;
  if (avatar === "") {
    avatar = "default";
  }
  if (nickname === "") {
    const getUser = await userRepository.userById(userId);

    nickname = getUser.name;
  }
  const profileInfo = {
    userId: userId,
    avatar: avatar,
    nickName: nickname,
    likesBooks: books,
    likesNovels: novels,
    likesMangas: mangas,
    likesComics: comics,
  };
  const preferences = await checkPreferences(userId, "profile");
  preferences;
  if (preferences === "update") {
  } else if (preferences === "create") {
    await createProfile(profileInfo);
  } else {
    throw badRequest;
  }
}

async function notificationsPreferences(
  token: string,
  userPreferences: UserPreferences
) {
  const userInfo = await userData(token);
  const userId = userInfo.id;
  const {
    showPublicNotifications,
    showFriendsNotifications,
    getPublicNotifications,
    getFriendsNotifications,
  } = userPreferences;
  const profileInfo = {
    userId: userId,
    showPublic: showPublicNotifications,
    showFriends: showFriendsNotifications,
    getPublic: getPublicNotifications,
    getFriends: getFriendsNotifications,
  };
  const preferences = await checkPreferences(userId, "notifications");
  if (preferences === "update") {
  } else if (preferences === "create") {
    await createNotifications(profileInfo);
  } else {
    throw badRequest;
  }
}

async function checkPreferences(userId: number, preferences: string) {
  let currentPreferences;

  if (preferences === "profile") {
    currentPreferences = await preferencesRepository.profilePreferencesById(
      userId
    );
  } else if (preferences === "notifications") {
    currentPreferences =
      await preferencesRepository.notificationsPreferencesById(userId);
  } else {
    throw badRequest;
  }

  if (!currentPreferences) {
    return "create";
  } else {
    return "update";
  }
}

async function createProfile(preferences: ProfilePreferences) {
  await preferencesRepository.createProfilePreferences(preferences);
}

async function createNotifications(preferences: NotificationsPreferences) {
  await preferencesRepository.createNotificationsPreferences(preferences);
}
async function userData(token: string) {
  try {
    const passKey = process.env.JWT_SECRET as string;

    const { email } = jwt.verify(token, passKey) as { email: string };

    const getUser = await userRepository.userByEmail(email);
    const userId = getUser[0].id;
    const getPreferences = await preferencesRepository.profilePreferencesById(
      userId
    );

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

export {
  userData,
  profilePreferences,
  notificationsPreferences,
  ProfilePreferences,
  NotificationsPreferences,
};
