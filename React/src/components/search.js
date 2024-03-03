import React, { useState } from 'react';

const Search = ({ data, setData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filteredData = data.filter(row => {
      return (
        row.customer_name.toLowerCase().includes(value) ||
        row.location.toLowerCase().includes(value)
      );
    });
    setData(filteredData);
  };

  return (
    <div className="searchbox">
      <p className='s1'>Search</p>
      <input
        type="text"
        placeholder="Enter name or location"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input" // Make sure this class aligns with your CSS for styling the input
      />
    </div>
  );
};

export default Search;
