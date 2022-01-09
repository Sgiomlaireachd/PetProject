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

  const updateFilteredCharacters = useCallback(async () => {
    try {
      if (!filters.length) return setFilteredCharacters(characters);

      setUpdateMode(UpdateMode.LoadingAll);
      let filteredCharacters = await fetchAllCharacters();

      filters.forEach(filter => {
        if (filter.type === FilterType.Films)
          filteredCharacters = filteredCharacters.filter(character =>
            character.films.some(film => filter.selected.includes(film)),
          );

        if (filter.type === FilterType.Species)
          filteredCharacters = filteredCharacters.filter(character =>
            character.species.some(species =>
              filter.selected.includes(species),
            ),
          );

        if (filter.type === FilterType.YearBorn) {
          const {from, to} = filter;

          if (from) {
            filteredCharacters = filteredCharacters.filter(
              character =>
                Number(character.birth_year.replace('BBY', '')) >= from,
            );
          }

          if (to) {
            filteredCharacters = filteredCharacters.filter(
              character =>
                Number(character.birth_year.replace('BBY', '')) <= to,
            );
          }
        }
      });

      setFilteredCharacters(filteredCharacters);
    } catch (error: any) {
      showError(error);
    } finally {
      setUpdateMode(undefined);
    }
  }, [filters, characters]);

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
