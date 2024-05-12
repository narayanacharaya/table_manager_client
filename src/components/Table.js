import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function Table() {
  const { tableName } = useParams();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/crud/${tableName}`)
      .then((response) => {
        if (response.data.length > 0) {
          setRows(response.data);
          setColumns(Object.keys(response.data[0]));
        } else {
          // If no rows, fetch column names only
          axios
            .get(`http://localhost:4000/crud/columns/${tableName}`)
            .then((response) => {
              setColumns(response.data.columns);
            })
            .catch((error) => {
              console.error('Error fetching columns:', error);
            });
        }
      })
      .catch((error) => {
        console.error('Error fetching rows:', error);
      });
  }, [tableName]);

  return (
    <div>
      <h2>{tableName}</h2>
      {rows.length > 0 ? (
        <table>
          <thead>
            <tr>
              {columns.map((columnName) => (
                <th key={columnName}>{columnName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <p>No records found. Showing column names only.</p>
          <ul>
            {columns.map((columnName, index) => (
              <li key={index}>{columnName}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Add insert, update, delete functionality */}
      <div>
        <Link to={`/insert/${tableName}`}>Insert</Link>
        {/* Link to insert page */}
      </div>
    </div>
  );
}

export default Table;
