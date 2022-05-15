import userRepository from "../repositories/userRepository.js";

async function truncate() {
  await userRepository.truncate();
}

export default { truncate };
export function signUp(userData: any) {
  throw new Error("Function not implemented.");
}
