import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import './layout.scss';
import SlimHeader from './slimHeader';
import MainHeader from './mainHeader';
import Footer from './footer';

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
          }
        }
      }
    `}
    render={data => (
      <>
        <SlimHeader
          owners={
            data.allDataYaml.edges[0].node.site.owners
          }
          slimHeaderLinks={
            data.allDataYaml.edges[0].node.site.slimHeaderLinks
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
        <Footer
          footerLinks={data.allDataYaml.edges[0].node.site.footerLinks}
          socialLinks={data.allDataYaml.edges[0].node.site.socialLinks}
        />
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
