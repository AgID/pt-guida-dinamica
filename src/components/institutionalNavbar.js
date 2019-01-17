import React from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import './institutionalNavbar.scss';

class InstitutionalNavbar extends React.Component {
  state = {
    isOpen: false
  };

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar className="navbar-institutional py-1 px-3" dark expand="lg">
        <Container>
          <NavbarToggler onClick={() => this.toggle()} />
          <div>
            {this.props.institutionalOwners
              .map(institutionalOwner => {
                return (
                  <NavbarBrand
                    key={institutionalOwner.name}
                    href={institutionalOwner.url}>
                    {institutionalOwner.name}
                  </NavbarBrand>
                );
              })
              .reduce((prev, curr, index) => [
                prev,
                <span key={index} className="text-white mr-3">+</span>,
                curr
              ])
            }
          </div>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.props.institutionalNavbarLinks
                .map((institutionalNavbarLinkGroup, groupIndex) =>
                  institutionalNavbarLinkGroup.map(
                    (institutionalNavbarLinkItem, itemIndex) => {
                      return (
                        <NavItem
                          key={[groupIndex, itemIndex].join('-')}
                          className={
                            (itemIndex + 1 ===
                              institutionalNavbarLinkGroup.length) &&
                              (groupIndex + 1 !==
                                this.props.institutionalNavbarLinks.length)
                              ? 'nav-item-w-divider' : null
                          }
                        >
                          <NavLink href={institutionalNavbarLinkItem.url}>
                            {institutionalNavbarLinkItem.name}
                          </NavLink>
                        </NavItem>
                      );
                    })
                )
              }
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

InstitutionalNavbar.propTypes = {
  institutionalOwners: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })).isRequired,
  institutionalNavbarLinks:
    PropTypes.arrayOf(PropTypes.arrayOf(
      PropTypes.exact({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    )).isRequired
};

export default InstitutionalNavbar;
