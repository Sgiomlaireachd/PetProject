import {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import Loader from '../../components/Loader';
import useCharacterFilms from '../../hooks/useCharacterFilms';
import useCharacterSpaceships from '../../hooks/useCharacterSpaceships';
import useCharacterSpecies from '../../hooks/useCharacterSpecies';
import {
  BackButton,
  BackImage,
  Container,
  HorizontalContainer,
  InfoContainer,
  InfoTitle,
  ListText,
  LoaderContainer,
} from './styled';
import {lightShadow} from '../../styles';
import rightArrowImage from '../../assets/img/right-arrow.png';

const CharacterDetails: React.FC = () => {
  const {
    params: {character},
  } = useRoute<any>();

  const [isFilmsTextExpanded, setIsFilmsTextExpanded] = useState(false);

  const [species, {loading: speciesLoading}] = useCharacterSpecies(character);
  const [films, {loading: filmsLoading}] = useCharacterFilms(character);
  const [starships, {loading: starshipsLoading}] =
    useCharacterSpaceships(character);

  const navigation = useNavigation<any>();

  const onFilmTextPress = () => setIsFilmsTextExpanded(prevValue => !prevValue);

  const renderCharacterName = () => (
    <HorizontalContainer>
      <InfoTitle>Name:</InfoTitle>
      <ListText>{character.name}</ListText>
    </HorizontalContainer>
  );

  const renderCharacterSpecies = () => (
    <HorizontalContainer>
      <InfoTitle>Species:</InfoTitle>
      {speciesLoading ? renderLoader() : renderListText(species)}
    </HorizontalContainer>
  );

  const renderCharacterMovies = () => (
    <HorizontalContainer isExpanded={isFilmsTextExpanded}>
      <InfoTitle>Films:</InfoTitle>
      {filmsLoading ? renderLoader() : renderListText(films, onFilmTextPress)}
    </HorizontalContainer>
  );

  const renderCharacterSpaceships = () => (
    <HorizontalContainer>
      <InfoTitle>Spaceships:</InfoTitle>
      {starshipsLoading ? renderLoader() : renderListText(starships)}
    </HorizontalContainer>
  );

  const renderLoader = () => (
    <LoaderContainer>
      <Loader size="small" />
    </LoaderContainer>
  );

  const renderListText = (list: any[], onPress?: () => void) => (
    <ListText onPress={onPress} isExpanded={isFilmsTextExpanded}>
      {list.join(', ') || 'None'}
    </ListText>
  );

  const rednerBackButton = () => (
    <BackButton onPress={navigateBack}>
      <BackImage source={rightArrowImage} resizeMode="contain" />
    </BackButton>
  );

  const navigateBack = () => navigation.goBack();

  return (
    <Container>
      <InfoContainer style={lightShadow}>
        {renderCharacterName()}
        {renderCharacterSpecies()}
        {renderCharacterMovies()}
        {renderCharacterSpaceships()}
      </InfoContainer>
      {rednerBackButton()}
    </Container>
  );
};

export default CharacterDetails;
