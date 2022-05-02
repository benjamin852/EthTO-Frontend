import axios from 'axios';
import consola from 'consola';

let api = process.env.BASE_API_URL;

/** REGISTER **/

export const registerNewUserDb = async (userEthAddress, username, firstName, lastName, signature, email, type) => {
  try {
    const registeredUser = await axios.post(`${api}/user/register`, {
      userEthAddress,
      username,
      firstName,
      lastName,
      signature,
      email,
      type,
    });
    return registeredUser;
  } catch (error) {
    consola.error('ApiService: registerNewUserDB():', error);
  }
};

/** GET USER **/

export const getUserFromEthAddressDb = async ethAddress => {
  try {
    if (ethAddress == undefined) {
      return;
    } else {
      const user = await axios.get(`${api}/user/ethAddress/${ethAddress}`);
      return user;
    }
  } catch (error) {
    consola.error('ApiService getUserFromEthAddressDb():', error);
  }
};

export const getUserFromUsernameDb = async username => {
  try {
    const user = await axios.get(`${api}/user/username/${username}`);
    return user;
  } catch (error) {
    consola.error('ApiService getUserFromUsernameDb():', error);
  }
};

/** GENERATE CHALLENGE **/
export const generateChallengeDb = async ethAddress => {
  try {
    const challenge = await axios.get(`${api}/user/${ethAddress}/auth/generate-challenge`);
    return challenge.data.challenge;
  } catch (error) {
    consola.error('ApiSerivce generateChallengeDb():', error);
  }
};
