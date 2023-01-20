import { useState } from 'react';
import css from '../Searchbox/Searchbox.module.css';

export const Searchbox = ({ onSubmit }) => {
  const [query, setQuery] = useState();

  const handleClear = () => {
    setTimeout(() => setQuery(''), 100);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={query}
        onInput={e => setQuery(e.currentTarget.value)}
        className={css.input}
      />
      <button type="Submit" onClick={handleClear} className={css.button}>
        Search
      </button>
    </form>
  );
};
