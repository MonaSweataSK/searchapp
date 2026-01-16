import { useEffect, useState, useMemo } from 'react';
import './App.css'

function App() {
  const [ quotesData, setQuotesData ] = useState([]);
  const [ search, setSearch] = useState('');
  const [ debouncedSearch, setDebouncedSearch ] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/quotes')
      .then((response) => response.json())
      .then(data => setQuotesData(data.quotes))
      .catch(error => console.error('Error fetching quotes:', error));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredQuotes = useMemo(() => {
    return quotesData.filter((quote) => {
      return quote.quote.toLowerCase().includes(debouncedSearch.toLowerCase()) || quote.author.toLowerCase().includes(debouncedSearch.toLowerCase())
    });
  }, [quotesData, debouncedSearch]);

  return (
    <div className={`App-${Date.now()}`}>
      <input placeholder='Search....' value={search} onChange={(e) => setSearch(e.target.value)}></input>
      {filteredQuotes.map((quote) => (
          <div key={quote.id}>
             <p>{quote.quote}</p>
             <p>{quote.author}</p>
          </div>
        ))}
    </div>
  );
   
}

export default App
