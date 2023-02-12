import styles from './Search.module.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

export function Search({
  setSearchQuery,
}: {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [input, setInput] = useState('');
  const [prevSearches, setPrevSearches] = useState([]);
  console.log(prevSearches);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    input && setPrevSearches([...prevSearches, input]);
    setSearchQuery(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.search}
        type="search"
        placeholder="Search bikes..."
        onChange={handleSearchChange}
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
}
