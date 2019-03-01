import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import MegaMenu from './megaMenu';
import Icon from './icon';

const MainHeader = props => (
  <>
    <div class="it-nav-wrapper">
      <div class="it-header-center-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="it-header-center-content-wrapper">
                <div class="it-brand-wrapper">
                  <Link to="/">
                    <Icon icon="code-circle" />
                    <div class="it-brand-text">
                      <h2 class="no_toc">{props.title}</h2>
                      <h3 class="no_toc d-none d-md-block">{props.description}</h3>
                    </div>
                  </Link>
                </div>
                <div class="it-right-zone">
                  <div class="it-socials d-none d-md-flex">
                  </div>
                  <div class="it-search-wrapper">
                  </div>
                </div>
              </div>
            </div >
          </div >
        </div >
      </div >
      <div class="it-header-navbar-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-12">
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
