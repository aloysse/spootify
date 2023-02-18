import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children, initailState, reducer }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initailState)}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateProvider = () =>useContext(StateContext);