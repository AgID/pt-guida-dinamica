import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import {
  Col,
  Container,
  Row
} from 'reactstrap';

const MainHeader = props => (
  <div className="it-header-center-wrapper it-small-header">
    <Container>
      <Row>
        <Col xs="12">
          <div className="it-header-center-content-wrapper p-0">
            <div className="it-brand-wrapper">
              <Link to="/">
                <svg className="icon">
                  <use
                    xlinkHref="/assets/icons.svg#it-code-circle">
                  </use>
                </svg>
                <div className="it-brand-text">
                  <h2 className="no_toc">{props.title}</h2>
                  <h3 className="no_toc d-none d-md-block">
                    {props.description}
                  </h3>
                </div>
              </Link>
            </div>
            <div className="it-right-zone">
              <div className="it-socials d-none d-md-flex">
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
                            <svg className="icon">
                              <use
                                xlinkHref=
                                  {`/assets/icons.svg#it-${socialLink.icon}`}
                              >
                              </use>
                            </svg>
                          </a>
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </div>

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
    ).isRequired
};

export default MainHeader;
