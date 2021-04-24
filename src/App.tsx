import * as React from 'react';
import CSSModules from 'react-css-modules';

import AppRouter from '@Routes/appRouter';

import styles from './App.scss';

const App: React.FC = () => (
  <div styleName="title">
    <AppRouter />
  </div>
);

export default CSSModules(App, styles);
