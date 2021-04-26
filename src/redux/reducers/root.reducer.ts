import { iActions } from '../action.type';
import { rootActions } from '../constant/rootActions';

export interface iRootState {
  someState?: string;
}

// 初始化 State 状态
const initRootState: iRootState = {
  someState: 'xxx',
};

// Root Reducers
const rootReducers = (currState = initRootState, action: iActions) => {
  const { type, payload } = action;

  switch (type) {
    case rootActions.UPDATE_STATE:
      return {
        ...currState,
        ...payload,
      };
    default:
      return currState;
  }
};

export {
  rootReducers,
  initRootState,
};
