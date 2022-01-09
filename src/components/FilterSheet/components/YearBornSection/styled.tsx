import styled from 'styled-components';
import {screenWidth} from '../../../../helpers/constants';

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
  width: ${screenWidth / 3}px;
  margin-left: 10px;
  padding: 5px 10px;
`;

export const ValidationErrorText = styled.Text`
  font-size: 12px;
  font-style: italic;
  color: red;
  align-self: center;
`;
