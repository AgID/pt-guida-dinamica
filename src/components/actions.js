import React from 'react';
import PropTypes from 'prop-types';

const Actions = ({ actions }) => {
  const output =
    <>
      <table className="table table-striped table-borderless table-responsive-md">

        <thead>
          <tr>
            <th scope="col">Azioni Piano triennale 2017-2019</th>
            <th className="text-center" scope="col"></th>
            <th scope="col">Azioni Piano triennale 2019-2021</th>
          </tr>
        </thead>

        <tbody>

          {actions.map(a => (
            <tr>
              <td>
                <span className="float-left"><span className="circle">{a.label}</span></span>
                <p>{a.title}<br />
                  <small>{a.subtitle}</small>
                </p>
              </td>
              <td>
                <img src={`/images/${a.status}.svg`} alt="" />
              </td>

              <td>
                {a.new && a.new.map(n => (
                  <>
                    {n.label &&
                      <>
                        <span className="float-left"><span className="circle">{n.label}</span></span>
                        <p>{n.title}</p>
                      </>
                    }
                    {n.icon &&
                      <div className="d-flex w-100 pb-4">
                        <span className="float-left pl-3"><img src={`/images/${n.icon}.svg`} alt="" /></span>
                      </div>
                    }
                  </>
                ))}
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </>
    ;

  return output;
};

const RowShape = {
  label: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  status: PropTypes.string
};
RowShape.new = PropTypes.arrayOf(PropTypes.shape(RowShape));

Actions.propTypes = {
  actions:
    PropTypes.arrayOf(
      PropTypes.oneOf([
        PropTypes.shape(RowShape),
        PropTypes.shape({
          icon: PropTypes.string
        })
      ])).isRequired
};

export default Actions;
