import {useEffect, useState, useCallback} from 'react';
import {fetchEntityByUrl} from '../axios';

const useCharacterSpecies = (character: any) => {
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCharacterSpecies = useCallback(async () => {
    try {
      setLoading(true);

      const species = await Promise.all(
        character.species.map(async speciesUrl => {
          const entity = await fetchEntityByUrl(speciesUrl);
          return entity.name;
        }),
      );

      setSpecies(species);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }, [character]);

  useEffect(() => {
    fetchCharacterSpecies();
  }, [fetchCharacterSpecies]);

  const showError = (error: Error) => console.warn(error);

  return [species, {loading}];
};

export default useCharacterSpecies;
