import * as React from 'react';
import CSSModules from 'react-css-modules';

import styles from './index.scss';

const ComA: React.FC = () => (
  <div styleName="show">请开始你的表演</div>
);

export default CSSModules(ComA, styles);
