import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import {
  Col,
  Container,
  Row
} from 'reactstrap';

const Footer = props => (
  <footer className="neutral-1-bg-a9">
    <Container>
      <Row className="py-4">
        <Col xs="12" sm="6" md="4">

        </Col>
        <Col xs="12" sm="6" md="4">

        </Col>
        <Col xs="12" sm="6" md="4" className="text-white text-right pt-2">
          <span>Seguici su</span>
          {props.socialLinks
            .map(socialLink => {
              return (
                <a
                  className="text-white p-2"
                  key={socialLink.icon}
                  href={socialLink.url}
                  aria-label={socialLink.name}
                >
                  <svg className="icon icon-sm icon-light align-top">
                    <use
                      xlinkHref=
                        {`/assets/icons.svg#it-${socialLink.icon}`}
                    >
                    </use>
                  </svg>
                </a>
              );
            })
          }
        </Col>
      </Row>
      <Row className="py-4 border-white border-top">
        <ul className="col list-inline small">
          {props.footerLinks
            .map((footerLink, itemIndex) =>
              <li
                key={itemIndex}
                className="list-inline-item px-1"
              >
                <Link
                  className="small-prints font-weight-bold"
                  style={{ color: '#0bd9d2' }}
                  href={footerLink.url}>
                  {footerLink.name}
                </Link>
              </li>
            )
          }
        </ul>
      </Row>
    </Container>
  </footer>

);

Footer.propTypes = {
  footerLinks:
    PropTypes.arrayOf(
      PropTypes.exact({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
  socialLinks:
    PropTypes.arrayOf(
      PropTypes.exact({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
      })
    ).isRequired
};

export default Footer;
