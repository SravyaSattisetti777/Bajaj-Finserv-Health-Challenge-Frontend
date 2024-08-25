import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState('');

  const handleSubmit = async () => {
    try {
      const jsonData = JSON.parse(input);

      if (!Array.isArray(jsonData.data)) {
        alert('Invalid input format');
        return;
      }

      const res = await axios.post('http://localhost:5000/bfhl', jsonData);
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error.response || error.message);
      alert('Invalid JSON or server error');
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    let filteredData = [];
    switch (filter) {
      case 'Numbers':
        filteredData = response.numbers;
        break;
      case 'Alphabets':
        filteredData = response.alphabets;
        break;
      case 'Highest lowercase alphabet':
        filteredData = response.highest_lowercase_alphabet;
        break;
      default:
        filteredData = [];
    }

    return (
      <div>
        <h3>Filtered Response</h3>
        <p>{filter}: {filteredData.join(', ')}</p>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>API Input</h1>
      <textarea
        rows="5"
        cols="50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON data here, e.g., {"data": ["M", "1", "334", "4", "B"]}'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <select onChange={handleFilterChange} value={filter}>
        <option value="">Select Filter</option>
        <option value="Numbers">Numbers</option>
        <option value="Alphabets">Alphabets</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>
      {renderFilteredResponse()}
    </div>
  );
};

export default App;
