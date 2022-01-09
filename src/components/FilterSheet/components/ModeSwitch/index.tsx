import React from 'react';
import {TouchableOpacity} from 'react-native';
import {FilterMode} from '../..';
import {
  Container,
  HorizontalContainer,
  OptionText,
  SlashText,
  TitleText,
} from './styled';

type Props = {
  onModeChange: (mode: FilterMode) => void;
  currentFilterMode: FilterMode;
};

const ModeSwitch: React.FC<Props> = ({onModeChange, currentFilterMode}) => {
  const isAndCurrentFilterMode = currentFilterMode === FilterMode.And;

  const onOptionPress = (filterMode: FilterMode) => () =>
    onModeChange(filterMode);

  return (
    <Container>
      <TitleText>Filter mode:</TitleText>
      <HorizontalContainer>
        <TouchableOpacity onPress={onOptionPress(FilterMode.And)}>
          <OptionText isActive={isAndCurrentFilterMode}>And</OptionText>
        </TouchableOpacity>
        <SlashText>/</SlashText>
        <TouchableOpacity onPress={onOptionPress(FilterMode.Or)}>
          <OptionText isActive={!isAndCurrentFilterMode}>Or</OptionText>
        </TouchableOpacity>
      </HorizontalContainer>
    </Container>
  );
};

export default ModeSwitch;
