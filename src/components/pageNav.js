import React from 'react';
// import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'gatsby';
import {
  Button,
  Col,
  Container,
  Row
} from 'reactstrap';

import Icon from './icon';

const PageNav = props => (
  <Container className="py-3">
    <Row>
      <Col xs="12" lg="4" className="align-self-center text-left">
        {props.left.path && (
          <Link to={props.left.path}>
            <Button
              outline
              color="secondary"
              size="xs"
              className="w-75 d-inline-flex align-items-center">
              <Icon
                icon="chevron-left"
                className="icon-secondary"
              />
              <span className="flex-grow-1 text-nowrap text-truncate">{props.left.label}</span>
            </Button>
          </Link>
        )}
      </Col>
      <Col xs="12" lg="4">
        {props.up.path && (
          <Col xs="12" className={classNames('text-center', { 'mb-2': props.down.path })}>
            <Link to={props.up.path}>
              <Button
                outline
                color="secondary"
                size="xs"
                className="w-75 d-inline-flex align-items-center">
                <Icon
                  icon="collapse"
                  className="icon-secondary"
                />
                <span className="flex-grow-1 text-nowrap text-truncate">{props.up.label}</span>
              </Button>
            </Link>
          </Col>
        )}
        {props.down.path && (
          <Col xs="12" className="text-center">
            <Link to={props.down.path}>
              <Button
                outline
                color="secondary"
                size="xs"
                className="w-75 d-inline-flex align-items-center">
                <Icon
                  icon="expand"
                  className="icon-secondary"
                />
                <span className="flex-grow-1 text-nowrap text-truncate">{props.down.label}</span>
              </Button>
            </Link>
          </Col>
        )}
      </Col>
      <Col xs="12" lg="4" className="align-self-center text-right">
        {props.right.path && (
          <Link to={props.right.path}>
            <Button
              outline
              color="secondary"
              size="xs"
              className="w-75 d-inline-flex align-items-center">
              <span className="flex-grow-1 text-nowrap text-truncate">{props.right.label}</span>
              <Icon
                icon="chevron-right"
                className="icon-secondary"
              />
            </Button>
          </Link>
        )}
      </Col>
    </Row>
  </Container>
);

// MainHeader.propTypes = {
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   socialLinks:
//     PropTypes.arrayOf(
//       PropTypes.exact({
//         name: PropTypes.string.isRequired,
//         url: PropTypes.string.isRequired,
//         icon: PropTypes.string.isRequired
//       })
//     ).isRequired,
//   menu: PropTypes.array.isRequired
// };

export default PageNav;
