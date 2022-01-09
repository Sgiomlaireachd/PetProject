import {useEffect, useState, useCallback} from 'react';
import {fetchEntityByUrl} from '../axios';

const useCharacterFilms = (character: any) => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCharacterFilms = useCallback(async () => {
    try {
      setLoading(true);

      const films = await Promise.all(
        character.films.map(async filmUrl => {
          const entity = await fetchEntityByUrl(filmUrl);
          return entity.title;
        }),
      );

      setFilms(films);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }, [character]);

  useEffect(() => {
    fetchCharacterFilms();
  }, [fetchCharacterFilms]);

  const showError = (error: Error) => console.warn(error);

  return [films, {loading}];
};

export default useCharacterFilms;
