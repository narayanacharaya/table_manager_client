import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTable() {
  const navigate = useNavigate();
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState([
    { name: 'id', type: 'INT AUTO_INCREMENT PRIMARY KEY', nullable: false },
  ]);

  const validColumnTypes = [
    'INT',
    'VARCHAR',
    'TEXT',
    'DATE',
    'DATETIME',
    'BOOLEAN',
    'DECIMAL',
    // Add other valid types as needed
  ];

  const addColumn = () => {
    setColumns([...columns, { name: '', type: '', nullable: false }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    const newColumns = [...columns];
    newColumns[index][name] = newValue;
    setColumns(newColumns);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { tableName, columns };
    console.log('Request Data:', JSON.stringify(data, null, 2)); // Logging the request data
    axios
      .post('http://localhost:4000/tables/create', data)
      .then((response) => {
        console.log('Table created successfully:', response.data);
        navigate(`/table/${tableName}`);
        // Redirect or show success message
      })
      .catch((error) => {
        console.error('Error creating table:', error);
        // Handle error
      });
  };

  return (
    <div>
      <h2>Create Table</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tableName">Table Name:</label>
          <input
            type="text"
            id="tableName"
            name="tableName"
            value={tableName}
            onChange={(event) => setTableName(event.target.value)}
          />
        </div>
        <div>
          <h3>Columns:</h3>
          {columns.map((column, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                placeholder="Column Name"
                value={column.name}
                onChange={(event) => handleInputChange(index, event)}
              />
              <select
                name="type"
                value={column.type}
                onChange={(event) => handleInputChange(index, event)}
              >
                {validColumnTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <label>
                Nullable:
                <input
                  type="checkbox"
                  name="nullable"
                  checked={column.nullable}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={addColumn}>
            Add Column
          </button>
        </div>
        <button type="submit">Create Table</button>
      </form>
    </div>
  );
}

export default CreateTable;
