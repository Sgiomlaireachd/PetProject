import React from 'react';
import {View} from 'react-native';
import {
  SectionContainer,
  SectionHeaderContainer,
  SectionTitle,
} from '../ListWithSelection/styled';
import {
  BornFormContainer,
  HorizontalContainer,
  InputLabel,
  StyledInput,
  ValidationErrorText,
} from './styled';

type Props = {
  validationError?: string;
  bornFrom: string;
  setBornFrom: (value: string) => void;
  bornTo: string;
  setBornTo: (value: string) => void;
};

const YearBornSection: React.FC<Props> = ({
  validationError,
  bornFrom,
  bornTo,
  setBornFrom,
  setBornTo,
}) => {
  const renderYearsSection = () => (
    <SectionContainer>
      <SectionHeaderContainer>
        <SectionTitle>Year born</SectionTitle>
      </SectionHeaderContainer>
      {renderYearBornForm()}
    </SectionContainer>
  );

  const renderYearBornForm = () => (
    <View>
      {renderYearBornFormInputs()}
      {renderYearBornValidationError()}
    </View>
  );

  const renderYearBornValidationError = () =>
    validationError ? (
      <ValidationErrorText>{validationError}</ValidationErrorText>
    ) : undefined;

  const renderYearBornFormInputs = () => (
    <BornFormContainer>
      {renderBornFromInput()}
      {renderBornToInput()}
    </BornFormContainer>
  );

  const renderBornFromInput = () => (
    <HorizontalContainer>
      <InputLabel type="numeric">From:</InputLabel>
      <StyledInput
        placeholder="any"
        value={bornFrom}
        onChangeText={setBornFrom}
      />
    </HorizontalContainer>
  );

  const renderBornToInput = () => (
    <HorizontalContainer>
      <InputLabel type="numeric">To:</InputLabel>
      <StyledInput placeholder="any" value={bornTo} onChangeText={setBornTo} />
    </HorizontalContainer>
  );

  return renderYearsSection();
};

export default YearBornSection;
