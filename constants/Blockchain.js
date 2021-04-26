// Status of blockchain related functions
export const CONTRACT_RESPONSE_STATUS = {
  SUCCESS: 'txn_success',
  INSUFFICIENT_FUNDS: 'txn.error.insufficient_funds',
  USER_REJECTED: 'txn.error.user_rejected',
  UNCLASSIFIED_FAILURE: 'txn.error.unclassified_failure',
};

export const NATIVE_CURRENCY = {
  symbol: 'ETH',
  address: 'Native Currency',
  decimals: 18,
};

// List of all Currencies supported
// Key must match symbol of ERC20!
// PRICE_LOOKUP_KEY is the id of the currency on coingecko.com
export const ALL_SUPPORTED_CURRENCIES = {
  DAI: {
    NAME: 'DAI',
    PRICE_LOOKUP_KEY: 'dai-token',
    PRICE_LOOKUP_KEY: 'dai',
  },
};