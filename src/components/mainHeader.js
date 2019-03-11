import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import MegaMenu from './megaMenu';

const MainHeader = props => (
  <>
    <div className="it-nav-wrapper">
      <div className="it-header-center-wrapper it-small-header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="it-header-center-content-wrapper">
                <div className="it-brand-wrapper">
                  <Link to="/">
                    {/* <Icon icon="code-circle" /> */}
                    <div className="it-brand-text">
                      <h2 className="no_toc">{props.title}</h2>
                      <h3 className="no_toc d-none d-md-block">{props.description}</h3>
                    </div>
                  </Link>
                </div>
                <div className="it-right-zone">
                  <div className="it-socials d-none d-md-flex">
                  </div>
                  <div className="it-search-wrapper">
                  </div>
                </div>
              </div>
            </div >
          </div >
        </div >
      </div >
      <div className="it-header-navbar-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <MegaMenu menu={props.menu} />
            </div>
          </div>
        </div>
      </div>
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
