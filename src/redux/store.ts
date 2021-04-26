import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
} from 'redux';
import createSagaMiddlewares from 'redux-saga';

import {
  iRootState,
  initRootState,
  rootReducers,
} from './reducers/root.reducer';

import { appRootSages } from './sagas/app.saga';

// 整体应用 State 类型定义
export interface iAppStateTypes {
  root: iRootState;
}

// 1. Root Reducer
const rootReducer = combineReducers({
  root: rootReducers, // root reducers
});

// 2. 初始State
const appInitState: iAppStateTypes = {
  root: { ...initRootState }, // root init state
};

// 3. 中间件
// redux开发工具便于查看数据
let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

// redux saga 中间件
const reduxSagaMiddlewares = createSagaMiddlewares();
// 整合Sage 中间件
const middlewares = composeEnhancers(applyMiddleware(
  reduxSagaMiddlewares,
));

// Store
const appStore = createStore(
  rootReducer,
  appInitState,
  middlewares,
);

// 运行废钢相关 saga
reduxSagaMiddlewares.run(appRootSages);

export {
  appStore,
};
