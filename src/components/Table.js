import React from 'react';


const Table = ({ data }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>sno</th>
            <th>customer_name</th>
            <th>age</th>
            <th>phone</th>
            <th>location</th>
            <th colSpan="2">created_at</th> {/* colspan="2" for the main header */}
          </tr>
          <tr>
            <th></th> {/* Empty header for sno */}
            <th></th> {/* Empty header for customer_name */}
            <th></th> {/* Empty header for age */}
            <th></th> {/* Empty header for phone */}
            <th></th> {/* Empty header for location */}
            <th className="date">date</th> {/* Date subcolumn */}
            <th className="time">time</th> {/* Time subcolumn */}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.sno}</td>
              <td>{row.customer_name}</td>
              <td>{row.age}</td>
              <td>{row.phone}</td>
              <td>{row.location}</td>
              {/* Split created_at into date and time */}
              <td className="date">{row.created_at ? new Date(row.created_at).toLocaleDateString() : ''}</td>
              <td className="time">{row.created_at ? new Date(row.created_at).toLocaleTimeString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
