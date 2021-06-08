import axios from 'axios';
import consola from 'consola';

let api = process.env.BASE_API_URL;

export const getTweetDataFromDB = async tweet => {
  try {
    const data = await axios.get(`${process.env.BASE_API_URL}/getTweet/${tweet}`);
    console.log(data, ' the data');
  } catch (error) {
    console.log('ApiService: getTweetData()', error);
  }
};

export const createNewCampaignProposalDb = async (
  business,
  influencer,
  agreedStartDate,
  agreedDeadline,
  jackpotReward,
  incrementalReward,
  jackpotTarget,
  incrementalTarget,
  potentialPayout,
  objective,
  niche,
) => {
  try {
    const campaign = await axios.post(`${api}/campaignProposal/create`, {
      business,
      influencer,
      agreedStartDate,
      agreedDeadline,
      jackpotReward,
      incrementalReward,
      jackpotTarget,
      incrementalTarget,
      potentialPayout,
      objective,
      niche,
    });
    consola.success('ApiService: createNewCampaignProposal() campaign being created:', campaign);
    return campaign;
  } catch (error) {
    consola.error('ApiService: createNewCampaignOnProposal():', error);
    throw error;
  }
};

export const getCampaignProposalDb = async id => {
  try {
    const campaign = await axios.get(`${api}/campaignProposal/${id}`);
    consola.success('ApiService: getCampaignProposal():', campaign);
    return campaign;
  } catch (error) {
    consola.error('ApiService: getCampaignProposal():', error);
  }
};