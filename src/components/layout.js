import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import './layout.scss';
import SlimHeader from './slimHeader';
import MainHeader from './mainHeader';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        allDataYaml(filter: {
          site: {title: {ne: null}}
        }) {
          edges {
            node {
              site {
                title
                description
                institutionalOwners {
                  name
                  url
                }
                institutionalNavbarLinks {
                  name
                  url
                }
                socialLinks {
                  name
                  url
                  icon
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <SlimHeader
          institutionalOwners={
            data.allDataYaml.edges[0].node.site.institutionalOwners
          }
          institutionalNavbarLinks={
            data.allDataYaml.edges[0].node.site.institutionalNavbarLinks
          }
        />
        <MainHeader
          title={data.allDataYaml.edges[0].node.site.title}
          description={data.allDataYaml.edges[0].node.site.description}
          socialLinks={data.allDataYaml.edges[0].node.site.socialLinks}
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
