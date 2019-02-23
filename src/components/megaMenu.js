import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'gatsby';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Row
} from 'reactstrap';

import Icon from './icon';

class MegaMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOffcanvasOpen: false,
      isDropdownOpen: {}
    };
  }

  toggleOffcanvas() {
    this.setState(prevState => {
      return {
        isOffcanvasOpen: !prevState.isOffcanvasOpen
      };
    });
  }

  toggleDropdown(menuItem) {
    this.setState(prevState => {
      let isDropdownOpen = { ...prevState.isDropdownOpen };

      isDropdownOpen[menuItem] = !prevState.isDropdownOpen[menuItem];
      return {
        isDropdownOpen: isDropdownOpen
      };
    });
  }

  renderMenu(parentSlug, menuTree, depth = 0) {
    const columns = depth === 0 ? 2 : 1;
    return <ul className="p-2 megamenu-list" style={{ columns, columnGap: '1em' }}>
      {menuTree.map(subMenuItem => (
        <li
          className="mx-4 my-2"
          key={`${parentSlug}-${subMenuItem.slug}`}
        >
          <Link
            to={`/${parentSlug}/${subMenuItem.slug}`}
          >
            {subMenuItem.name}
          </Link>
          {subMenuItem.subtree && this.renderMenu(`/${parentSlug}/${subMenuItem.slug}`, subMenuItem.subtree, depth + 1)}
        </li>
      ))}
    </ul>;
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg has-megamenu" aria-label="main navigation">
        <button
          className="custom-navbar-toggler"
          type="button"
          aria-controls="megaMenu"
          aria-expanded={this.state.isOffcanvasOpen}
          aria-label="Toggle navigation"
          onClick={() => this.toggleOffcanvas()}
        >
          <Icon icon="list" />
        </button>
        <CSSTransition
          in={this.state.isOffcanvasOpen}
          timeout={{
            enter: 1,
            exit: 300,
          }}
          classNames={{
            enter: 'navbar-collapsable d-block',
            enterDone: 'navbar-collapsable d-block expanded',
            exit: 'navbar-collapsable d-block',
            exitDone: 'navbar-collapsable',
          }}
        >
          {state => (
            <div
              className='navbar-collapsable'
              id="megaMenu"
            >
              <div
                className="overlay d-block"
                onClick={() => this.toggleOffcanvas()}
              ></div>
              <div className="close-div sr-only">
                <button
                  className="btn close-menu"
                  type="button"
                  onClick={() => this.toggleOffcanvas()}
                >
                  <Icon icon="close" />close
                </button>
              </div>
              <div className="menu-wrapper">
                <ul className="navbar-nav">
                  {this.props.menu.map(menuItem => (
                    <li
                      key={menuItem.slug}
                      className={classNames({
                        'mb-3': this.state.isOffcanvasOpen
                      })}
                    >{menuItem.subtree ? (
                        <Dropdown
                          isOpen={this.state.isOffcanvasOpen || this.state.isDropdownOpen[menuItem.slug]}
                          toggle={() => this.toggleDropdown(menuItem.slug)}
                          className="nav-item megamenu"
                        >
                          <DropdownToggle
                            tag="a"
                            className="nav-link dropdown-toggle"
                            style={{
                              marginBottom: this.state.isOffcanvasOpen && '-16px',
                              cursor: 'pointer'
                            }}
                          >
                            {menuItem.name}
                            <Icon
                              icon="expand"
                              className={classNames(
                                'icon-xs',
                                'ml-1',
                                { 'd-none': this.state.isOffcanvasOpen }
                              )}
                            />
                          </DropdownToggle>
                          <DropdownMenu modifiers={{
                            relativePosition: {
                              enabled: true,
                              order: 890,
                              fn: data => {
                                data = this.state.isOffcanvasOpen
                                  ? {
                                    ...data,
                                    styles: {
                                      ...data.styles,
                                      borderRadius: '4px',
                                      position: 'relative',
                                      transform: 'none',
                                      animationDuration: '0.1s'
                                    }
                                  } : {
                                    ...data,
                                    styles: {
                                      ...data.styles,
                                      borderRadius: '4px',
                                      transform: 'translate3d(25px, 35px, 0px)',
                                      animationDuration: '0.1s'
                                    }
                                  };
                                return data;
                              },
                            },
                          }}
                          className="p-3"
                          >
                            <Row>
                              {this.renderMenu(menuItem.slug, menuItem.subtree)}
                            </Row>
                          </DropdownMenu>
                        </Dropdown>
                      ) : <Link
                        to={`/${menuItem.slug}`}
                        className="nav-link dropdown-toggle"
                      >
                        {menuItem.name}
                      </Link>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CSSTransition>
      </nav>
    );
  }
}

MegaMenu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      subtree: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired
      })
      )
    })
  )
};

export default MegaMenu;
