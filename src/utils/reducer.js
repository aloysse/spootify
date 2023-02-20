import { reducerCases } from "./Constants";

export const initailState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylistId: "5FqQl7pyLWgBbLxIAb6K9T",
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case reducerCases.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    default:
      return state;
  }
};

export default reducer;
