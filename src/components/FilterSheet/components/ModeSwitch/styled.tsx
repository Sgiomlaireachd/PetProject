import styled from 'styled-components/native';

type OptionTextProps = {
  isActive: boolean;
};

export const HorizontalContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Container = styled(HorizontalContainer)`
  padding: 25px 20px;
  justify-content: space-between;
`;

export const TitleText = styled.Text`
  color: black;
  font-weight: bold;
  font-size: 16px;
`;

export const SlashText = styled.Text`
  color: black;
  margin: 0px 10px;
`;

export const OptionText = styled.Text`
  color: ${(props: OptionTextProps) => (props.isActive ? 'white' : 'black')};
  padding: 5px 10px;
  background-color: ${(props: OptionTextProps) =>
    props.isActive ? 'black' : 'white'};
  text-transform: uppercase;
  font-weight: ${(props: OptionTextProps) =>
    props.isActive ? 'bold' : 'normal'};
`;
