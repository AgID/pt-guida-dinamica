import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import {
  Container
} from 'reactstrap';

import './layout.scss';
import SlimHeader from './slimHeader';
import MainHeader from './mainHeader';
import Footer from './footer';

const Layout = props => (
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
          menu={props.menu}
        />
        <Container className="justify-content-md-center main">
          {props.children}
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
  menu: PropTypes.array.isRequired
};

export default Layout;
