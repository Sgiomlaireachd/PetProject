import styled from 'styled-components/native';
import {screenWidth} from '../../../../helpers/constants';

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

type FilterListButtonProps = {
  isActive: boolean;
};

export const FilterListButton = styled.TouchableOpacity`
  height: 30px;
  padding: 0px 10px;
  align-items: center;
  justify-content: center;
  background-color: ${(props: FilterListButtonProps) =>
    props.isActive ? 'black' : 'white'};
  border: 1px solid black;
  border-radius: 10px;
  margin-right: 10px;
`;

export const FilterListNameText = styled.Text`
  color: ${(props: FilterListButtonProps) =>
    props.isActive ? 'white' : 'black'};
`;

export const LoaderContainer = styled.View`
  height: 30px;
  margin-left: ${screenWidth / 2 - 25}px;
`;

export const StyledFlatList = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
}))``;
