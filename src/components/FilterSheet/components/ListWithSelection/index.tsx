import React from 'react';
import Loader from '../../../Loader';
import {
  FilterListButton,
  FilterListNameText,
  LoaderContainer,
  SectionContainer,
  SectionHeaderContainer,
  SectionTitle,
  StyledFlatList,
} from './styled';

type Props = {
  title: string;
  loading: boolean;
  data: any[];
  selectedData: any[];
  toggleSelectData: (item: any) => void;
};

const ListWithSelection: React.FC<Props> = ({
  title,
  loading,
  data,
  selectedData,
  toggleSelectData,
}) => {
  const renderDataSection = () => (
    <SectionContainer>
      <SectionHeaderContainer>
        <SectionTitle>{title}</SectionTitle>
      </SectionHeaderContainer>
      {renderDataList()}
    </SectionContainer>
  );

  const renderDataList = () => (
    <StyledFlatList
      data={data}
      keyExtractor={item => item.url}
      renderItem={renderDataItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={renderLoader}
    />
  );

  const renderLoader = () => (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );

  const renderDataItem = ({item}: {item: any}) => {
    const isSelected = !!selectedData.find(
      selectedDataItem => item.url === selectedDataItem,
    );

    return (
      <FilterListButton
        isActive={isSelected}
        onPress={() => toggleSelectData(item)}>
        <FilterListNameText isActive={isSelected}>
          {item.title || item.name}
        </FilterListNameText>
      </FilterListButton>
    );
  };

  return renderDataSection();
};
export default ListWithSelection;
