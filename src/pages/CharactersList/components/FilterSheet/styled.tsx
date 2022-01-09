import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {FilterButton, FilterText} from '../../styled';

const {width: screenWidth} = Dimensions.get('window');

export const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flex: 1,
    paddingTop: isIphoneX() ? 30 : 10,
    paddingBottom: isIphoneX() ? 30 : 10,
    justifyContent: 'space-between',
  },
}))``;

export const SectionContainer = styled.View``;

export const SectionHeaderContainer = styled.View`
  padding: 10px 20px;
  background-color: white;
  box-shadow: 0px 5px 5px grey;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const ChevronButton = styled.TouchableOpacity``;

type SpeciesButtonProps = {
  isActive: boolean;
};

export const SpeciesButton = styled.TouchableOpacity`
  padding: 5px 10px;
  background-color: ${(props: SpeciesButtonProps) =>
    props.isActive ? 'black' : 'white'};
  border: 1px solid black;
  border-radius: 10px;
  margin-right: 10px;
`;

export const SpeciesNameText = styled.Text`
  color: ${(props: SpeciesButtonProps) => (props.isActive ? 'white' : 'black')};
`;

export const FilmButton = styled(SpeciesButton)``;

export const FilmNameText = styled(SpeciesNameText)``;

export const BornFormContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
`;

export const HorizontalContainer = styled(BornFormContainer)`
  padding: 0px;
`;

export const InputLabel = styled.Text`
  font-size: 16px;
  color: black;
`;

export const StyledInput = styled.TextInput`
  background-color: white;
  border: 1px solid black;
  border-radius: 15px;
  width: ${screenWidth / 3};
  margin-left: 10px;
  padding: 5px 10px;
`;

export const ApplyButton = styled(FilterButton)`
  position: static;
  bottom: 0px;
`;

export const ApplyText = styled(FilterText)``;

export const ValidationErrorText = styled.Text`
  font-size: 12px;
  font-style: italic;
  color: red;
  align-self: center;
`;

export const StyledFlatList = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
}))``;
