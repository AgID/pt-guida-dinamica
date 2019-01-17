import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import './layout.scss';
import InstitutionalNavbar from './institutionalNavbar';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        allDataYaml {
          edges {
            node {
              title
              institutionalOwners {
                name
                url
              }
              institutionalNavbarLinks {
                name
                url
              }
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <InstitutionalNavbar
          institutionalOwners={
            data.allDataYaml.edges[0].node.institutionalOwners
          }
          institutionalNavbarLinks={
            data.allDataYaml.edges[0].node.institutionalNavbarLinks
          }
        />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          {children}
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
