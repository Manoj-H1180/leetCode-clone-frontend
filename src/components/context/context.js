import React from "react";

const context = React.createContext({
  userDetails: {},
  setUserDetails: () => {},
});

export default context;
