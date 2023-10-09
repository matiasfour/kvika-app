import { Colors } from '@kvika/theme';
import * as React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { FontWeight } from '../../dls/StyleGuide';
import { Pill } from '../../types/Types';
import KvikaPill from '../KvikaPill/KvikaPill';
import { StyledListContainer } from './KvikaPillListStyles';

type Props<T extends Pill> = {
  pills: T[];
  onSelectPill: (selectedPill: T) => void;
  selectedPill?: T;
  flatListRef?: React.RefObject<FlatList<T>>;
};

const KvikaPillList = <T extends Pill>({ pills, onSelectPill, selectedPill, flatListRef }: Props<T>) => {
  return (
    <StyledListContainer>
      <FlatList
        ref={flatListRef}
        horizontal
        data={pills}
        renderItem={({ item }) => {
          const selected = selectedPill?.text === item.text;
          return (
            <KvikaPill
              pill={item}
              onSelectPill={onSelectPill}
              fontWeight={selected ? FontWeight.Medium : FontWeight.Regular}
              fontColor={selected ? Colors.gold150 : Colors.goldGray400}
              backgroundColor={selected ? Colors.gray900 : Colors.black7}
            />
          );
        }}
        keyExtractor={(item) => item.text}
        showsHorizontalScrollIndicator={false}
      />
    </StyledListContainer>
  );
};

KvikaPillList.displayName = 'KvikaPillList';

export default KvikaPillList;
