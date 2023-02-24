import { reducerCases } from "./Constants";

export const initailState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylistId: "5FqQl7pyLWgBbLxIAb6K9T",
  selectedPlayList: null,
  currentlyPlaying: null,
  currentlyPlayingIndex: 0,
  playbackState: false,
  volume: 1,
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
      // console.log(action.selectedPlaylist);
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case reducerCases.SET_PLAYING:
      // console.log("playing", action.currentlyPlaying);
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
        // currentlyPlayingIndex: action.currentlyPlayingIndex,
      };
    case reducerCases.SET_PLAYER_STATE:
      // console.log("play state", action.playbackState);
      return {
        ...state,
        playbackState: action.playbackState,
      };
    case reducerCases.SET_PLAYINGLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    case reducerCases.SET_VOLUME:
      return {
        ...state,
        volume: action.volume,
      };
    case reducerCases.SET_PLAYING_INDEX:
      // console.log("index", action.currentlyPlayingIndex);
      return {
        ...state,
        currentlyPlayingIndex: action.currentlyPlayingIndex,
      };
    default:
      return state;
  }
};

export default reducer;
