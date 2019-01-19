import React from 'react';
import classNames from 'classnames';

import Icons from '../icons/icons.svg';

const Icon = props => (
  <svg className={classNames('icon', props.className)}>
    <use
      xlinkHref=
        {`${Icons}#it-${props.icon}`}
    >
    </use>
  </svg>
);

export default Icon;
