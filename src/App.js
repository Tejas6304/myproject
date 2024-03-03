// In App.js

import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Pagination from './components/Pagination';
import Sort from './components/sort'; // Corrected import path
import Search from './components/search'; // Corrected import path
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(20);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [resetSort, setResetSort] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(data);
    setOriginalData(data);
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5001/customers');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetData = () => {
    setFilteredData(originalData);
    setCurrentPage(1);
    setResetSort(prevState => !prevState); // Use function to toggle state
  };

  return (
    <div className='body'>

      <h1>Customer Table</h1>
      <div className='searchsort'>
        <Search data={data} setData={setFilteredData} />
        <button className='b1' onClick={resetData}>Reset</button>
        <Sort data={filteredData} setData={setFilteredData} resetSort={resetSort} setResetSort={setResetSort} />
      </div>
      
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <Table data={currentData} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / dataPerPage)}
            onPageChange={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default App;
