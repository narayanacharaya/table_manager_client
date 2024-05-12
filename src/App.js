import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateTable from './components/CreateTable';
import TableList from './components/TableList';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Table Manager</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<TableList />} />
            <Route path="/create" element={<CreateTable />} />
            <Route path="/table/:tableName" component={Table} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
