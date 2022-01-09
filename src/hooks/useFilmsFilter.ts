import {useState} from 'react';
import {fetchFilms} from '../axios';

const useFilmsFilter = () => {
  const [films, setFilms] = useState([]);
  const [filmsLoading, setFilmsLoading] = useState(false);
  const [selectedFilms, setSelectedFilms] = useState([]);

  const loadFilms = () => {
    if (films.length) return;

    setFilmsLoading(true);
    fetchFilms()
      .then(setFilms)
      .catch(showError)
      .finally(() => setFilmsLoading(false));
  };

  const showError = (error: Error) => console.warn(error);

  const toggleSelectFilm = (film: any) => {
    const isAlreadySelected = selectedFilms.find(item => item === film.url);

    if (isAlreadySelected) {
      setSelectedFilms(prevFilms =>
        prevFilms.filter(item => item !== film.url),
      );
    } else {
      setSelectedFilms(prevFilms => [...prevFilms, film.url]);
    }
  };

  return [films, selectedFilms, {filmsLoading, loadFilms, toggleSelectFilm}];
};

export default useFilmsFilter;
