import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import {
  Button
} from 'reactstrap';

import Icon from './icon';

const PageNav = props => (
  <div className="py-3 d-lg-flex justify-content-between">
    {props.left.path && (
      <div className="mb-2 mb-lg-0">
        <Link to={props.left.path}>
          <Button
            outline
            color="secondary"
            size="xs"
            className="w-100 d-inline-flex align-items-center">
            <Icon
              icon="chevron-left"
              className="icon-secondary"
            />
            <span className="text-nowrap">{props.left.label}</span>
          </Button>
        </Link>
      </div>
    )}
    {props.up && props.up.path && (
      <div className="align-self-center mb-2 mb-lg-0">
        <Link to={props.up.path}>
          <Button
            outline
            color="secondary"
            size="xs"
            className="w-100 d-inline-flex align-items-center">
            <Icon
              icon="collapse"
              className="icon-secondary"
            />
            <span className="flex-grow-1 text-nowrap">{props.up.label}</span>
          </Button>
        </Link>
      </div>
    )}
    {props.down && props.down.path && (
      <div className="align-self-center p-0 mt-2 mb-lg-0">
        <Link to={props.down.path}>
          <Button
            outline
            color="secondary"
            size="xs"
            className="w-100 d-inline-flex align-items-center">
            <Icon
              icon="expand"
              className="icon-secondary"
            />
            <span className="flex-grow-1 text-nowrap">{props.down.label}</span>
          </Button>
        </Link>
      </div>
    )}
    {props.right.path && (
      <div xs="12" lg="3" className="align-self-center mt-2 mb-lg-0">
        <Link to={props.right.path}>
          <Button
            outline
            color="secondary"
            size="xs"
            className="w-100 d-inline-flex align-items-center">
            <span className="text-right flex-grow-1 text-nowrap">{props.right.label}</span>
            <Icon
              icon="chevron-right"
              className="icon-secondary"
            />
          </Button>
        </Link>
      </div>
    )}
  </div>
);

PageNav.propTypes = {
  left: PropTypes.exact({
    path: PropTypes.string,
    label: PropTypes.string,
  }),
  up: PropTypes.exact({
    path: PropTypes.string,
    label: PropTypes.string,
  }),
  down: PropTypes.exact({
    path: PropTypes.string,
    label: PropTypes.string,
  }),
  right: PropTypes.exact({
    path: PropTypes.string,
    label: PropTypes.string,
  })
};

export default PageNav;
