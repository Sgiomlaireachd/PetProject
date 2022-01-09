import {isIphoneX} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: ${isIphoneX() ? 45 : 0}px;
`;

export const EmptyStateText = styled.Text`
  color: black;
  font-size: 14px;
  text-align: center;
  align-self: center;
  padding: 0px 20px;
`;

export const CharacterButton = styled.TouchableOpacity`
  padding: 25px 15px;
  margin-bottom: 15px;
  background-color: white;
  box-shadow: -1px 3px 5px grey;
  width: 90%;
  align-self: center;
`;

export const CharacterNameText = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: bold;
`;

export const FilterButton = styled.TouchableOpacity`
  position: absolute;
  bottom: ${isIphoneX() ? 50 : 30}px;
  align-self: center;
  padding: 10px 50px;
  background-color: black;
  box-shadow: 0px 0px 5px grey;
  border-radius: 20px;
`;

export const FilterText = styled.Text`
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;

export const StyledFlatList = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    paddingTop: 5,
    paddingBottom: 10,
  },
}))``;
