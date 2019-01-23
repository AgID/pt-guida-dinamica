import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import {
  Col,
  Container,
  Row
} from 'reactstrap';

import './layout.scss';
import SlimHeader from './slimHeader';
import MainHeader from './mainHeader';
import Footer from './footer';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteConfigQuery {
        configYaml {
          title
          description
          owners {
            name
            url
          }
          slimHeaderLinks {
            name
            url
          }
          socialLinks {
            name
            url
            icon
          }
          footerLinks {
            name
            url
          }
        }
      }
    `}
    render={data => (
      <>
        <SlimHeader
          owners={
            data.configYaml.owners
          }
          slimHeaderLinks={
            data.configYaml.slimHeaderLinks
          }
        />
        <MainHeader
          title={data.configYaml.title}
          description={data.configYaml.description}
          socialLinks={data.configYaml.socialLinks}
        />
        <Container>
          <Row>
            <Col xs="12">
              {children}
            </Col>
          </Row>
        </Container>
        <Footer
          footerLinks={data.configYaml.footerLinks}
          socialLinks={data.configYaml.socialLinks}
        />
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
