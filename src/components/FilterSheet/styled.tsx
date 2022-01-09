import styled from 'styled-components/native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {FilterButton, FilterText} from '../../pages/CharactersList/styled';

export const ApplyButton = styled(FilterButton)`
  position: static;
  bottom: 0px;
`;

export const ApplyText = styled(FilterText)``;

export const ScrollViewContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flex: 1,
    paddingTop: isIphoneX() ? 30 : 10,
    paddingBottom: isIphoneX() ? 30 : 10,
    justifyContent: 'space-between',
  },
}))``;
