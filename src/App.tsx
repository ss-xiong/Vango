import * as React from 'react';
import { Provider } from 'react-redux';

import { AppRouter } from '@Routes/appRouter';
import { appStore } from '@Redux/store';

import './App.scss';

const App: React.FC = () => (
  <Provider store={appStore}>
    <div className="App">
      <AppRouter />
    </div>
  </Provider>
);

export {
  App,
};
