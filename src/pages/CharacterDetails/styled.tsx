import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

type ExpandableProps = {
  isExpanded: boolean;
};

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

export const HorizontalContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px 0px;
  min-height: 25px;
`;

export const InfoTitle = styled.Text`
  font-weight: bold;
  margin-right: 5px;
`;

export const InfoContainer = styled.View`
  padding: 10px 15px;
  margin: 0px 20px;
  background-color: white;
`;

export const LoaderContainer = styled.View`
  height: 25px;
`;

export const BackButton = styled.TouchableOpacity`
  padding: 10px;
  margin-right: 10px;
  margin-top: 5px;
  align-self: flex-end;
`;

export const BackImage = styled(FastImage)`
  width: 30px;
  height: 30px;
  transform: rotate(180deg);
`;

export const ListText = styled.Text.attrs(props => ({
  numberOfLines: props.isExpanded ? undefined : 1,
}))`
  flex: 1;
  font-size: 12px;
  color: #696969;
  font-style: italic;
`;
