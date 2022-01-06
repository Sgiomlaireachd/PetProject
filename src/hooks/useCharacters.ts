import {useState, useCallback, useMemo} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {fetchCharacters} from '../axios';

export enum UpdateMode {
  Loading = 'loading',
  LoadingMore = 'loadingMore',
  Refreshing = 'Refreshing',
}

const useCharacters = () => {
  const [data, setData] = useState();
  const [updateMode, setUpdateMode] = useState();

  const characters = useMemo(() => data?.results || [], [data]);

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
    if (!data.next || updateMode) return;
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

  return [characters, {updateMode, loadMoreCharacters, loadCharacters}];
};

export default useCharacters;
