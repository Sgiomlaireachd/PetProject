import {useEffect, useState, useCallback} from 'react';
import {fetchEntityByUrl} from '../axios';

const useCharacterSpaceships = (character: any) => {
  const [starships, setStarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCharacterSpaceships = useCallback(async () => {
    try {
      setLoading(true);

      let starships = await Promise.all(
        character.starships.map(async starshipUrl => {
          const entity = await fetchEntityByUrl(starshipUrl);
          return entity.name;
        }),
      );

      setStarships(starships);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }, [character]);

  useEffect(() => {
    fetchCharacterSpaceships();
  }, [fetchCharacterSpaceships]);

  const showError = (error: Error) => console.warn(error);

  return [starships, {loading}];
};

export default useCharacterSpaceships;
