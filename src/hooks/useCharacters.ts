import {useState, useCallback, useMemo, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {fetchAllCharacters, fetchCharacters} from '../axios';
import {FilterType} from '../components/FilterSheet';

export enum UpdateMode {
  Loading = 'loading',
  LoadingMore = 'loadingMore',
  Refreshing = 'Refreshing',
  LoadingAll = 'LoadingAll',
}

const useCharacters = (filters: any) => {
  const [data, setData] = useState();
  const [updateMode, setUpdateMode] = useState();

  const characters = useMemo(() => data?.results || [], [data]);

  const [filteredCharacters, setFilteredCharacters] = useState(characters);

  const filterCharactersByFilms = (characters: any[], filter: any) => {
    return characters.filter(character =>
      character.films.some(film => filter.selected.includes(film)),
    );
  };

  const filterCharactersBySpecies = (characters: any[], filter: any) => {
    return characters.filter(character =>
      character.species.some(species => filter.selected.includes(species)),
    );
  };

  const filterCharactersByYearBorn = (characters: any[], filter: any) => {
    const {from, to} = filter;
    let filteredCharacters = [...characters];

    if (from) {
      filteredCharacters = filteredCharacters.filter(
        character => Number(character.birth_year.replace('BBY', '')) >= from,
      );
    }

    if (to) {
      filteredCharacters = filteredCharacters.filter(
        character => Number(character.birth_year.replace('BBY', '')) <= to,
      );
    }

    return filteredCharacters;
  };

  const getFilteredCharacters = useCallback(async () => {
    let filteredCharacters = await fetchAllCharacters();

    filters.forEach(filter => {
      switch (filter.type) {
        case FilterType.Films:
          filteredCharacters = filterCharactersByFilms(
            filteredCharacters,
            filter,
          );
        case FilterType.Species:
          filteredCharacters = filterCharactersBySpecies(
            filteredCharacters,
            filter,
          );
        case FilterType.YearBorn:
          filteredCharacters = filterCharactersByYearBorn(
            filteredCharacters,
            filter,
          );
      }
    });

    return filteredCharacters;
  }, [filters]);

  const updateFilteredCharacters = useCallback(async () => {
    try {
      if (!filters.length) return setFilteredCharacters(characters);

      setUpdateMode(UpdateMode.LoadingAll);
      const filteredCharacters = await getFilteredCharacters();

      setFilteredCharacters(filteredCharacters);
    } catch (error: any) {
      showError(error);
    } finally {
      setUpdateMode(undefined);
    }
  }, [filters, characters, getFilteredCharacters]);

  useEffect(() => {
    updateFilteredCharacters();
  }, [updateFilteredCharacters]);

  useFocusEffect(
    useCallback(() => {
      loadCharacters();
    }, []),
  );

  const loadCharacters = (pageUrl?: string) => {
    changeUpdateModeOnLoad(pageUrl);
    fetchCharacters(pageUrl)
      .then(updateData)
      .catch(showError)
      .finally(resetUpdateMode);
  };

  const changeUpdateModeOnLoad = (pageUrl?: string) => {
    if (pageUrl) {
      setUpdateMode(UpdateMode.LoadingMore);
    } else {
      setUpdateMode(data ? UpdateMode.Refreshing : UpdateMode.Loading);
    }
  };

  const resetUpdateMode = () => setUpdateMode(undefined);

  const loadMoreCharacters = () => {
    if (!data.next || updateMode || filters.length) return;
    return loadCharacters(data.next);
  };

  const updateData = (fetchedCharactersData: any) => {
    if (!fetchedCharactersData.previous) return setData(fetchedCharactersData);

    setData(prevData => ({
      ...fetchedCharactersData,
      results: [...prevData.results, ...fetchedCharactersData.results],
    }));
  };

  const showError = (error: Error) => console.warn(error);

  return [filteredCharacters, {updateMode, loadMoreCharacters, loadCharacters}];
};

export default useCharacters;
