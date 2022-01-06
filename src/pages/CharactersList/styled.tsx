import {isIphoneX} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const EmptyStateText = styled.Text`
  color: black;
  font-size: 14px;
  text-align: center;
  align-self: center;
  padding: 0px 20px;
`;

export const StyledFlatList = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    paddingTop: isIphoneX() ? 45 : 0,
    paddingBottom: isIphoneX() ? 15 : 0,
  },
}))``;

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
