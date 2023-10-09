import * as React from 'react';
import KvikaCheckbox from '../KvikaCheckbox/KvikaCheckbox';
import KvikaText from '../KvikaText';

type Props = {
  title: string;
  onPress: () => void;
  isChecked?: boolean;
};

const Portfolio = ({ title, onPress, isChecked = false }: Props) => {
  return (
    <KvikaCheckbox isChecked={isChecked} onPress={onPress}>
      <KvikaText>{title}</KvikaText>
    </KvikaCheckbox>
  );
};

export default Portfolio;
