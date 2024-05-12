import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TableList() {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:400/table')
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tables:', error);
      });
  }, []);

  return (
    <div>
      <h2>Tables</h2>
      <ul>
        {tables.map((table) => (
          <li key={table.tableName}>
            <Link to={`/table/${table.tableName}`}>{table.tableName}</Link>
          </li>
        ))}
      </ul>
      <Link to="/create">Create Table</Link>
    </div>
  );
}

export default TableList;
