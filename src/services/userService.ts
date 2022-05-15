import userRepository from "../repositories/userRepository.js";

async function truncate() {
  await userRepository.truncate();
}

export default { truncate };
