import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import {
  Col,
  Container,
  Row
} from 'reactstrap';

import MegaMenu from './megaMenu';
import Icon from './icon';

const MainHeader = props => (
  <>
    <header className="it-header-center-wrapper it-small-header">
      <Container>
        <Row>
          <Col xs="12">
            <div className="it-header-center-content-wrapper p-0">
              <div className="it-brand-wrapper">
                <Link to="/">
                  <Icon icon="code-circle" />
                  <div className="it-brand-text">
                    <h2 className="no_toc">{props.title}</h2>
                    <h3 className="no_toc d-none d-md-block">
                      {props.description}
                    </h3>
                  </div>
                </Link>
              </div>
              <div className="it-right-zone">
                {/* <div className="it-socials d-none d-md-flex">
                  <span>Seguici su</span>
                  <ul>
                    {props.socialLinks
                      .map(socialLink => {
                        return (
                          <li key={socialLink.icon}>
                            <a
                              href={socialLink.url}
                              aria-label={socialLink.name}
                            >
                              <Icon icon={socialLink.icon} />
                            </a>
                          </li>
                        );
                      })
                    }
                  </ul>
                  </div> */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
    <div className="navbar">
      <Container className="d-block">
        <MegaMenu menu={props.menu} />
      </Container>
    </div>
  </>
);

MainHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  socialLinks:
    PropTypes.arrayOf(
      PropTypes.exact({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
      })
    ).isRequired,
  menu: PropTypes.array.isRequired
};

export default MainHeader;
