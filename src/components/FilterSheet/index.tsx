import React, {forwardRef, useCallback, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {ApplyButton, ApplyText, ScrollViewContainer} from './styled';
import useSpeciesFilter from '../../hooks/useSpeciesFilter';
import useFilmsFilter from '../../hooks/useFilmsFilter';
import ListWithSelection from './components/ListWithSelection';
import YearBornSection from './components/YearBornSection';
import ModeSwitch from './components/ModeSwitch';

const SNAP_POINTS = ['100%'];

export enum FilterMode {
  And = 'And',
  Or = 'Or',
}

export enum FilterType {
  Species = 'Species',
  Films = 'Films',
  YearBorn = 'YearBorn',
}

type Props = {
  onApply: (filters: any) => void;
  filterMode: FilterMode;
  setFilterMode: (mode: FilterMode) => void;
};

const FilterSheet: React.FC = forwardRef(
  ({filterMode, setFilterMode, onApply}: Props, sheetRef) => {
    const [
      species,
      selectedSpecies,
      {speciesLoading, loadSpecies, toggleSelectSpecies},
    ] = useSpeciesFilter();

    const [films, selectedFilms, {filmsLoading, loadFilms, toggleSelectFilm}] =
      useFilmsFilter();

    const [bornFrom, setBornFrom] = useState('');
    const [bornTo, setBornTo] = useState('');
    const [yearBornValidationError, setYearBornValidationError] = useState();

    const renderContent = () => (
      <ScrollViewContainer bounces={false}>
        <View>
          {renderFilterModeSwitch()}
          {renderSpeciesSection()}
          {renderFilmsSection()}
          {renderYearBornSection()}
        </View>
        {renderApplyButton()}
      </ScrollViewContainer>
    );

    const renderFilterModeSwitch = () => (
      <ModeSwitch currentFilterMode={filterMode} onModeChange={setFilterMode} />
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
      onApply(filtersData, filterMode);
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
        return [
          undefined,
          "Year born 'from' should be less then year born 'to'",
        ];
      }

      const resultFilter = {
        type: FilterType.YearBorn,
      };

      if (bornFrom) resultFilter['from'] = Number(bornFrom);
      if (bornTo) resultFilter['to'] = Number(bornTo);

      return [resultFilter, undefined];
    };

    const renderFilmsSection = () => (
      <ListWithSelection
        title="Films"
        data={films}
        selectedData={selectedFilms}
        loading={filmsLoading}
        toggleSelectData={toggleSelectFilm}
      />
    );

    const renderSpeciesSection = () => (
      <ListWithSelection
        title="Species"
        data={species}
        selectedData={selectedSpecies}
        loading={speciesLoading}
        toggleSelectData={toggleSelectSpecies}
      />
    );

    const renderYearBornSection = () => (
      <YearBornSection
        bornFrom={bornFrom}
        bornTo={bornTo}
        setBornFrom={setBornFrom}
        setBornTo={setBornTo}
        validationError={yearBornValidationError}
      />
    );

    const onSheetStateChange = useCallback((index: number) => {
      switch (index) {
        case 0:
          return onSheetOpen();
      }
    }, []);

    const onSheetOpen = () => {
      loadSpecies();
      loadFilms();
    };

    return (
      <BottomSheet
        ref={sheetRef}
        snapPoints={SNAP_POINTS}
        enablePanDownToClose
        onChange={onSheetStateChange}>
        {renderContent()}
      </BottomSheet>
    );
  },
);

export default FilterSheet;
