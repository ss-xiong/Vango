import * as React from 'react';
import CSSModules from 'react-css-modules';

import ComA from '@Components/ComA';
import styles from './App.scss';

const App: React.FC = () => (
  <div styleName="title">
    Hello梵高APP, 这是梵高绘制中心
    <ComA />
  </div>
);

export default CSSModules(App, styles);
