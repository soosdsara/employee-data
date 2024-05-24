import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

async function fetchTools(filter) {
  const response = await fetch(`/api/tools?filter=${filter || 'all'}`);
  const tools = await response.json();
  return tools
}

function Tools() {
  const [tools, setTools] = useState([]);
  const [filter, setFilter] = useState(null);
  const [newTool, setNewTool] = useState(null);
  const [weight, setWeight] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nameSearchQuery = params.get('name')

  useEffect(() => {
    if (nameSearchQuery) {
      setFilter(nameSearchQuery)
    }
    async function fetchData() {
      const tools = await fetchTools(filter)
      setTools(tools)
    }
    fetchData()
  }, [filter, nameSearchQuery])

  async function addNewTool() {
    const response = await fetch('/api/tools',
      {
        method: 'POST',
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ name: newTool, weight: weight }),
      });
    return response.json();
  }

  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {tools.map((tool, index) => (
          <li key={index}>{tool.name}_____{tool.weight} kg</li>
        ))}
      </ul>
      <form onSubmit={() => addNewTool()}>
        Add a new tool:
        <label>
          Name:
          <input type='text' value={newTool} onChange={(e) => setNewTool(e.target.value)} />
        </label>
        <label>
          Weight:
          <input type='number' step='0.01' value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <button type='submit'>Add the tool</button>
      </form>
    </div>
  )
}

export default Tools