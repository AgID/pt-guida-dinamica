import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import classNames from "classnames";
import Icon from "./icon";

const PageNav = props => (
  <div className="py-3 d-lg-flex justify-content-between">
    {props.left && props.left.path && props.left.path !== "" && (
      <div className="align-self-center mb-2 mb-lg-0">
        <Link to={props.left.path}>
          <span className="btn btn-outline-secondary btn-xs w-100 d-inline-flex align-items-center pr-4">
            <Icon icon="chevron-left" className="icon-secondary" />
            <span className="text-nowrap">{props.left.label}</span>
          </span>
        </Link>
      </div>
    )}
    {props.up && props.up.path && props.up.path !== "" && (
      <div className="align-self-center mb-2 mb-lg-0">
        <Link to={props.up.path}>
          <span className="btn btn-outline-secondary btn-xs w-100 d-inline-flex align-items-center pr-4">
            <Icon icon="collapse" className="icon-secondary" />
            <span className="flex-grow-1 text-nowrap">{props.up.label}</span>
          </span>
        </Link>
      </div>
    )}
    {props.down && props.down.path && props.down.path !== "" && (
      <div className="align-self-center mb-2 mb-lg-0">
        <Link to={props.down.path}>
          <span className="btn btn-outline-secondary btn-xs w-100 d-inline-flex align-items-center pr-4">
            <Icon icon="expand" className="icon-secondary" />
            <span className="flex-grow-1 text-nowrap">{props.down.label}</span>
          </span>
        </Link>
      </div>
    )}
    {props.right && props.right.path && props.right.path !== "" && (
      <div
        className={classNames({
          "align-self-center": true,
          "mb-2": true,
          "mb-lg-0": true,
          "ml-auto": !props.left || !props.left.path || props.left.path === ""
        })}
      >
        <Link to={props.right.path}>
          <span className="btn btn-outline-secondary btn-xs w-100 d-inline-flex align-items-center pl-4">
            <span className="text-right flex-grow-1 text-nowrap">
              {props.right.label}
            </span>
            <Icon icon="chevron-right" className="icon-secondary" />
          </span>
        </Link>
      </div>
    )}
  </div>
);

PageNav.propTypes = {
  left: PropTypes.exact({
    path: PropTypes.string,
    label: PropTypes.string
  }),
  up: PropTypes.exact({
    path: PropTypes.string,
    label: PropTypes.string
  }),
  down: PropTypes.exact({
    path: PropTypes.string,
    label: PropTypes.string
  }),
  right: PropTypes.exact({
    path: PropTypes.string,
    label: PropTypes.string
  })
};

export default PageNav;
