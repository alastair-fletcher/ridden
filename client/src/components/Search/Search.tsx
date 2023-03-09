import { useState } from 'react';
import { ISearchProps } from '../../interfaces/interfaces';
import styles from './Search.module.css';

export function Search({ setSearchQuery }: ISearchProps) {
  const [input, setInput] = useState('');
  const [prevSearches, setPrevSearches] = useState<string[]>([]);
  // console.log(prevSearches.slice(-5));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    input && setPrevSearches([...prevSearches, input.trim()]);
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
    </form>
  );
}
