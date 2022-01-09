import React, {forwardRef, useCallback, useState} from 'react';
import {View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  ApplyButton,
  ApplyText,
  BornFormContainer,
  Container,
  FilmButton,
  FilmNameText,
  HorizontalContainer,
  InputLabel,
  SectionContainer,
  SectionHeaderContainer,
  SectionTitle,
  SpeciesButton,
  SpeciesNameText,
  StyledFlatList,
  StyledInput,
  ValidationErrorText,
} from './styled';
import Loader from '../../../../components/Loader';
import {fetchFilms, fetchSpecies} from '../../../../axios';
import {ScrollView} from 'react-native-gesture-handler';

const SNAP_POINTS = ['100%'];

export enum FilterType {
  Species = 'Species',
  Films = 'Films',
  YearBorn = 'YearBorn',
}

type Props = {
  onApply: (filters: any) => void;
};

const FilterSheet: React.FC = forwardRef(({onApply}: Props, sheetRef) => {
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [species, setSpecies] = useState([]);
  const [speciesLoading, setSpeciesLoading] = useState(false);
  const [bornFrom, setBornFrom] = useState('');
  const [bornTo, setBornTo] = useState('');
  const [yearBornValidationError, setYearBornValidationError] = useState();

  const [films, setFilms] = useState([]);
  const [filmsLoading, setFilmsLoading] = useState(false);
  const [selectedFilms, setSelectedFilms] = useState([]);

  const renderContent = () => (
    <Container bounces={false}>
      <View>
        {renderSpeciesSection()}
        {renderFilmsSection()}
        {renderYearsSection()}
      </View>
      {renderApplyButton()}
    </Container>
  );

  const renderApplyButton = () => (
    <ApplyButton onPress={onApplyButtonPress}>
      <ApplyText>Apply</ApplyText>
    </ApplyButton>
  );

  const onApplyButtonPress = () => {
    const [filtersData, validationError] = getFiltersData();

    if (validationError) {
      return setYearBornValidationError(validationError);
    } else {
      setYearBornValidationError(undefined);
    }

    sheetRef.current?.close();
    onApply(filtersData);
  };

  const getFiltersData = () => {
    const speciesFilterData = getSpeciesFilterData();
    const filmsFilterData = getFilmsFilterData();
    const [yearBornFilterData, validationError] = getYearBornFilterData();

    const filtersData = [
      speciesFilterData,
      filmsFilterData,
      yearBornFilterData,
    ].filter(Boolean);

    return [filtersData, validationError];
  };

  const getSpeciesFilterData = () =>
    selectedSpecies.length
      ? {
          type: FilterType.Species,
          selected: selectedSpecies,
        }
      : undefined;

  const getFilmsFilterData = () =>
    selectedFilms.length
      ? {
          type: FilterType.Films,
          selected: selectedFilms,
        }
      : undefined;

  const getYearBornFilterData = () => {
    if (!bornFrom && !bornTo) return [undefined, undefined];

    if (bornFrom > bornTo && bornTo) {
      return [undefined, "Year born 'from' should be less then year born 'to'"];
    }

    const resultFilter = {
      type: FilterType.YearBorn,
    };

    if (bornFrom) resultFilter.from = Number(bornFrom);
    if (bornTo) resultFilter.to = Number(bornTo);

    return [resultFilter, undefined];
  };

  const renderFilmsSection = () => (
    <SectionContainer>
      <SectionHeaderContainer>
        <SectionTitle>Films</SectionTitle>
        {filmsLoading ? renderSmallLoader() : undefined}
      </SectionHeaderContainer>
      {renderFilmsList()}
    </SectionContainer>
  );

  const renderFilmsList = () => (
    <StyledFlatList
      data={films}
      keyExtractor={item => item.url}
      renderItem={renderFilmsItem}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );

  const renderSpeciesSection = () => (
    <SectionContainer>
      <SectionHeaderContainer>
        <SectionTitle>Species</SectionTitle>
        {speciesLoading ? renderSmallLoader() : undefined}
      </SectionHeaderContainer>
      {renderSpeciesList()}
    </SectionContainer>
  );

  const renderYearsSection = () => (
    <SectionContainer>
      <SectionHeaderContainer>
        <SectionTitle>Year born</SectionTitle>
      </SectionHeaderContainer>
      {renderYearBornForm()}
    </SectionContainer>
  );

  const renderYearBornForm = () => (
    <View>
      {renderYearBornFormInputs()}
      {renderYearBornValidationError()}
    </View>
  );

  const renderYearBornFormInputs = () => (
    <BornFormContainer>
      <HorizontalContainer>
        <InputLabel type="numeric">From:</InputLabel>
        <StyledInput
          placeholder="any"
          value={bornFrom}
          onChangeText={setBornFrom}
        />
      </HorizontalContainer>
      <HorizontalContainer>
        <InputLabel type="numeric">To:</InputLabel>
        <StyledInput
          placeholder="any"
          value={bornTo}
          onChangeText={setBornTo}
        />
      </HorizontalContainer>
    </BornFormContainer>
  );

  const renderYearBornValidationError = () =>
    yearBornValidationError ? (
      <ValidationErrorText>{yearBornValidationError}</ValidationErrorText>
    ) : undefined;

  const renderSpeciesList = () => (
    <StyledFlatList
      data={species}
      keyExtractor={item => item.url}
      renderItem={renderSpeciesItem}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );

  const renderSpeciesItem = ({item}: {item: any}) => {
    const isSelected = !!selectedSpecies.find(species => item.url === species);

    return (
      <SpeciesButton
        isActive={isSelected}
        onPress={() => onSpeciesItemPress(item)}>
        <SpeciesNameText isActive={isSelected}>{item.name}</SpeciesNameText>
      </SpeciesButton>
    );
  };

  const renderFilmsItem = ({item}: {item: any}) => {
    const isSelected = !!selectedFilms.find(film => item.url === film);

    return (
      <FilmButton isActive={isSelected} onPress={() => onFilmsItemPress(item)}>
        <FilmNameText isActive={isSelected}>{item.title}</FilmNameText>
      </FilmButton>
    );
  };

  const onSpeciesItemPress = (species: any) => {
    const isAlreadySelected = selectedSpecies.find(
      item => item === species.url,
    );

    if (isAlreadySelected) {
      setSelectedSpecies(prevSpecies =>
        prevSpecies.filter(item => item !== species.url),
      );
    } else {
      setSelectedSpecies(prevSpecies => [...prevSpecies, species.url]);
    }
  };

  const onFilmsItemPress = (film: any) => {
    const isAlreadySelected = selectedFilms.find(item => item === film.url);

    if (isAlreadySelected) {
      setSelectedFilms(prevFilms =>
        prevFilms.filter(item => item !== film.url),
      );
    } else {
      setSelectedFilms(prevFilms => [...prevFilms, film.url]);
    }
  };

  const renderSmallLoader = () => <Loader size="small" />;

  const onSheetStateChange = useCallback((index: number) => {
    switch (index) {
      case 0:
        return onSheetOpen();
      case -1:
        return onSheetClose();
    }
  }, []);

  const onSheetOpen = () => {
    loadSpecies();
    loadFilms();
  };

  const loadSpecies = () => {
    setSpeciesLoading(true);
    fetchSpecies()
      .then(setSpecies)
      .catch(showError)
      .finally(() => setSpeciesLoading(false));
  };

  const loadFilms = () => {
    setFilmsLoading(true);
    fetchFilms()
      .then(setFilms)
      .catch(showError)
      .finally(() => setFilmsLoading(false));
  };

  const showError = (error: Error) => console.warn(error);

  const onSheetClose = () => {};

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={SNAP_POINTS}
      enablePanDownToClose
      onChange={onSheetStateChange}>
      {renderContent()}
    </BottomSheet>
  );
});

export default FilterSheet;
