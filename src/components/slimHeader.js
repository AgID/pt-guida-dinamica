import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Collapse,
  Container,
  Row
} from 'reactstrap';

class SlimHeader extends React.Component {
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
      <div class="it-header-slim-wrapper">
        <Container>
          <Row>
            <Col xs="12">
              <div class="it-header-slim-wrapper-content">
                {this.props.institutionalOwners
                  .map(institutionalOwner => {
                    return (
                      <a
                        className="navbar-brand mr-1 mr-lg-3"
                        key={institutionalOwner.name}
                        href={institutionalOwner.url}>
                        {institutionalOwner.name}
                      </a>
                    );
                  })
                  .reduce((prev, curr, index) => [
                    prev,
                    <span
                      key={index}
                      className="navbar-brand text-white mr-1 mr-lg-3">
                      +
                    </span>,
                    curr
                  ])
                }
                <span class="nav-palce-mobile">
                  <nav>
                    <a
                      className="it-opener d-lg-none p-0"
                      onClick={() => this.toggle()}>
                      <svg class="icon">
                        <use xlinkHref="/assets/icons.svg#it-expand"></use>
                      </svg>
                    </a>
                    <Collapse
                      isOpen={this.state.isOpen}
                      className="link-list-wrapper"
                    >
                      <ul className="link-list">
                        {this.props.institutionalNavbarLinks
                          .map((institutionalNavbarLinkGroup, groupIndex) =>
                            institutionalNavbarLinkGroup.map((institutionalNavbarLinkItem, itemIndex) =>
                              <li
                                key={[groupIndex, itemIndex].join('-')}
                                className={
                                  (itemIndex + 1 ===
                                        institutionalNavbarLinkGroup.length) &&
                                        (groupIndex + 1 !==
                                          this.props.institutionalNavbarLinks.length)
                                    ? 'nav-item-w-divider' : null
                                }
                              >
                                <a href={institutionalNavbarLinkItem.url}>
                                  {institutionalNavbarLinkItem.name}
                                </a>
                              </li>
                            )
                          )
                        }
                      </ul>
                    </Collapse>
                  </nav>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

SlimHeader.propTypes = {
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

export default SlimHeader;
