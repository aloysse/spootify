import { reducerCases } from "./Constants";

export const initailState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylistId: "5FqQl7pyLWgBbLxIAb6K9T",
  selectedPlayList: null,
  currentlyPlaying: null,
  playbackState: null,
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
    case reducerCases.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case reducerCases.SET_PLAYING:
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      };
    case reducerCases.SET_PLAYER_STATE:
      return {
        ...state,
        playbackState: action.playbackState,
      };
    default:
      return state;
  }
};

export default reducer;
