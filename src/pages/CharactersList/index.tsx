import React, {useRef, useState} from 'react';
import {View, RefreshControl} from 'react-native';
import {
  CharacterButton,
  CharacterNameText,
  Container,
  EmptyStateText,
  FilterButton,
  FilterText,
  LoaderContainer,
  StyledFlatList,
} from './styled';
import Loader from '../../components/Loader';
import useCharacters, {UpdateMode} from '../../hooks/useCharacters';
import BottomSheet from '@gorhom/bottom-sheet';
import FilterSheet, {FilterMode} from '../../components/FilterSheet';

const CharactersList: React.FC = () => {
  const [filters, setFilters] = useState([]);
  const [filterMode, setFilterMode] = useState(FilterMode.And);

  const [characters, {updateMode, loadCharacters, loadMoreCharacters}] =
    useCharacters(filters, filterMode);

  const sheetRef = useRef<BottomSheet>(null);

  const isLoading = updateMode === UpdateMode.Loading;
  const isLoadingMore = updateMode === UpdateMode.LoadingMore;
  const isLoadingAll = updateMode === UpdateMode.LoadingAll;
  const isRefreshing = updateMode === UpdateMode.Refreshing;

  const refreshControl = (
    <RefreshControl
      refreshing={isRefreshing}
      onRefresh={loadCharacters}
      tintColor="black"
    />
  );

  const renderCharactersList = () =>
    isLoadingAll ? (
      renderLoader()
    ) : (
      <StyledFlatList
        data={characters}
        keyExtractor={item => item.url}
        renderItem={renderCharacter}
        ListEmptyComponent={isLoading ? renderLoader() : renderEmptyState}
        ListFooterComponent={renderLoadingMoreLoader}
        refreshControl={refreshControl}
        onEndReached={loadMoreCharacters}
        onEndReachedThreshold={0.3}
      />
    );

  const renderLoader = () => (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );

  const renderLoadingMoreLoader = () =>
    isLoadingMore ? renderLoader() : <View />;

  const renderEmptyState = () => (
    <EmptyStateText numberOfLines={1} adjustsFontSizeToFit>
      No people were found 🕵️‍♀️
    </EmptyStateText>
  );

  const renderCharacter = ({item: character}: {item: any}) => (
    <CharacterButton>
      <CharacterNameText>{character.name}</CharacterNameText>
    </CharacterButton>
  );

  const renderFilterSheet = () => (
    <FilterSheet
      ref={sheetRef}
      filterMode={filterMode}
      setFilterMode={setFilterMode}
      onApply={onApplyFilters}
    />
  );

  const onApplyFilters = (filters: any[], filterMode: FilterMode) => {
    setFilters(filters);
    setFilterMode(filterMode);
  };

  const renderFilterButton = () => (
    <FilterButton onPress={showFiltersSheet}>
      <FilterText>{`Filters ${
        filters.length ? `(${filters.length})` : ''
      }`}</FilterText>
    </FilterButton>
  );

  const showFiltersSheet = () => {
    sheetRef.current?.expand?.();
  };

  return (
    <Container>
      {renderCharactersList()}
      {renderFilterButton()}
      {renderFilterSheet()}
    </Container>
  );
};

export default CharactersList;
