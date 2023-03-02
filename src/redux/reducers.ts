import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import web3 from "./web3";
import globalState from "./globalState";
import rewardState from "./rewardState";
import triggerState from "./triggerState";

const rootReducer = combineReducers({
  counter,
  web3,
  globalState,
  rewardState,
  triggerState,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
