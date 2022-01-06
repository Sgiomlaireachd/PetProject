import React, {useState} from 'react';
import {FlatList, View, RefreshControl} from 'react-native';
import {
  CharacterButton,
  CharacterNameText,
  Container,
  EmptyStateText,
  StyledFlatList,
} from './styled';
import Loader from '../../components/Loader';
import useCharacters, {UpdateMode} from '../../hooks/useCharacters';

const CharactersList: React.FC = () => {
  const [characters, {updateMode, loadCharacters, loadMoreCharacters}] =
    useCharacters();

  const isLoading = updateMode === UpdateMode.Loading;
  const isLoadingMore = updateMode === UpdateMode.LoadingMore;
  const isRefreshing = updateMode === UpdateMode.Refreshing;

  const refreshControl = (
    <RefreshControl
      refreshing={isRefreshing}
      onRefresh={loadCharacters}
      tintColor="black"
    />
  );

  const renderCharactersList = () => (
    <StyledFlatList
      data={characters}
      keyExtractor={item => item.name}
      renderItem={renderCharacter}
      ListEmptyComponent={isLoading ? renderLoader : renderEmptyState}
      ListFooterComponent={renderLoadingMoreLoader}
      refreshControl={refreshControl}
      onEndReached={loadMoreCharacters}
      onEndReachedThreshold={0.3}
    />
  );

  const renderLoader = () => <Loader />;

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

  return <Container>{renderCharactersList()}</Container>;
};

export default CharactersList;
