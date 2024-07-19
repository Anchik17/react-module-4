import { useEffect } from 'react';
import List from './components/List/List';
import { useState } from 'react';
import { fetchNews } from './services/api';
import SearchBar from './components/SearchBar/SearchBar';

export const App = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('react');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchNews(query, page);
        setHits((prev) => [...prev, ...response.hits]);
        setTotal(response.nbPages);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSetQuery = (query) => {
    setQuery(query);
    setHits([]);
    setPage(0);
  };

  return (
    <div>
      <SearchBar setQuery={handleSetQuery} />
      {isError && <h2>Something went wrong! Try again...</h2>}
      <List items={hits} />
      {isLoading && <h1>Loading data...</h1>}
      {total > page &&
        !isLoading(
          <button onClick={() => setPage((prev) => prev + 1)}>Load more</button>
        )}
    </div>
  );
};
