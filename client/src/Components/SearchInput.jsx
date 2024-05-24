import React, { useState } from 'react';

function SearchInput({ onSearch }) {
  const [filter, setFilter] = useState('');

  async function handleSearch(e) {
    e.preventDefault();
    try {
      const response = await fetch(`/api/employees-filter?filter=${filter}`);
      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        name='level'
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button type='submit'>Search</button>
    </form>
  );
}

export default SearchInput;
