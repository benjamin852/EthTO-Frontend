import { SET_JWT, CLEAR_JWT } from '../actions/jwt';
const initialState = {
  jwt: null,
};

const setJwt = (state = initialState, action) => {
  switch (action.type) {
    case SET_JWT: {
      return action.payload;
    }
    case CLEAR_JWT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
export default setJwt;
