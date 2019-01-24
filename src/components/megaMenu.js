import React from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import {
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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

  getMenuChildren(parentSlug, menuTree, columns) {
    return menuTree && menuTree.map(menuSubItem => {
      let renderedMenuSubItem = (
        <div key={`${parentSlug}-${menuSubItem.slug}`}>
          <DropdownItem
            tag="div"
          >
            <Link to={`/${parentSlug}/${menuSubItem.slug}`}>
              {menuSubItem.name}
            </Link>
          </DropdownItem>
          <div className="ml-3">
            {menuSubItem.subtree &&
              this.getMenuChildren(`/${parentSlug}/${menuSubItem.slug}`, menuSubItem.subtree)
            }
          </div>
        </div>
      );

      columns && (
        renderedMenuSubItem = (
          <Col
            key={`col-${parentSlug}-${menuSubItem.slug}`}
            lg={columns}
          >
            {renderedMenuSubItem}
          </Col>
        )
      );
      return renderedMenuSubItem;
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg has-megamenu">
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
        <div
          className={classNames('navbar-collapsable', { expanded: this.state.isOffcanvasOpen })}
          id="megaMenu"
          style={{ display: this.state.isOffcanvasOpen && 'block' }}
        >
          <div
            className="overlay"
            onClick={() => this.toggleOffcanvas()}
            style={{ display: this.state.isOffcanvasOpen && 'block' }}
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
                  className={classNames('nav-item', {
                    'mb-3': this.state.isOffcanvasOpen
                  })}
                >{menuItem.subtree ? (
                    <Dropdown
                      isOpen={this.state.isOffcanvasOpen || this.state.isDropdownOpen[menuItem.slug]}
                      toggle={() => this.toggleDropdown(menuItem.slug)}
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
                                  transform: 'none'
                                }
                              } : {
                                ...data,
                                styles: {
                                  ...data.styles,
                                  borderRadius: '4px',
                                  transform: 'translate3d(25px, 35px, 0px)'
                                }
                              };
                            return data;
                          },
                        },
                      }}
                      className="p-3"
                      >
                        <Row>
                          {this.getMenuChildren(menuItem.slug, menuItem.subtree, 6)}
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
      </nav>
    );
  }
}

// SlimHeader.propTypes = {
//   owners: PropTypes.arrayOf(
//     PropTypes.exact({
//       name: PropTypes.string.isRequired,
//       url: PropTypes.string.isRequired
//     })).isRequired,
//   slimHeaderLinks:
//     PropTypes.arrayOf(PropTypes.arrayOf(
//       PropTypes.exact({
//         name: PropTypes.string.isRequired,
//         url: PropTypes.string.isRequired
//       })
//     )).isRequired
// };

export default MegaMenu;
