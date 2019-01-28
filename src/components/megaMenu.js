import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
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

  getSubMenuDepth(subMenuItem) {
    if (typeof subMenuItem.subtree === 'undefined') {
      return 1;
    }
    return subMenuItem.subtree.reduce((depth, subMenuItem) => {
      depth = depth + this.getSubMenuDepth(subMenuItem);
      return depth;
    }, 1);
  }

  renderMenu(parentSlug, menuTree) {
    let maxDepthMenuItem = null;
    let colSizes = Array(menuTree.length).fill(4);

    if (menuTree.length < 3) {
      maxDepthMenuItem = menuTree.reduce((maxDepthMenuItem, menuItem, menuItemIndex) => {
        const menuItemDepth = this.getSubMenuDepth(menuItem);

        maxDepthMenuItem = {
          index: menuItemDepth > maxDepthMenuItem.maxDepth ? menuItemIndex : maxDepthMenuItem.index,
          maxDepth: menuItemDepth > maxDepthMenuItem.maxDepth ? menuItemDepth : maxDepthMenuItem.maxDepth
        };
        return maxDepthMenuItem;
      }, {
        index: null,
        maxDepth: 0
      });

      (menuTree.length === 2) && (colSizes = [
        maxDepthMenuItem.index === 0 ? 8 : 4,
        maxDepthMenuItem.index === 1 ? 8 : 4
      ]);

      (menuTree.length === 1) && (colSizes = [12]);
    }

    return this.getMenuChildren(parentSlug, menuTree, colSizes, maxDepthMenuItem);
  }

  getMenuChildren(parentSlug, menuTree, colSizes, maxDepthMenuItem) {
    return menuTree && menuTree.map((subMenuItem, subMenuIndex) => {
      let subColSizes = colSizes && subMenuItem.subtree && subMenuItem.subtree.map(subTreeMenuItem => {
        let subColSize = 12;
        maxDepthMenuItem && (subMenuIndex === maxDepthMenuItem.index) && (
          subColSize = colSizes[subMenuIndex] === 8 ? 6 : 4
        );

        return subColSize;
      });
      let renderedMenuSubItem = (
        <div
          key={`${parentSlug}-${subMenuItem.slug}`}
          className={subColSizes && 'pb-3 pb-lg-0'}
        >
          <Link
            className="d-block"
            to={`/${parentSlug}/${subMenuItem.slug}`}
          >
            <DropdownItem
              tag="div"
              className="py-2"
            >
              {subMenuItem.name}
            </DropdownItem>
          </Link>
          {subMenuItem.subtree && maxDepthMenuItem && (
            <div className="d-flex flex-wrap ml-3 border-top">
              {this.getMenuChildren(`/${parentSlug}/${subMenuItem.slug}`, subMenuItem.subtree, subColSizes)}
            </div>
          )}
        </div>
      );

      colSizes && (
        renderedMenuSubItem = (
          <Col
            key={`col-${parentSlug}-${subMenuItem.slug}`}
            lg={colSizes[subMenuIndex]}
            xs='12'
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
