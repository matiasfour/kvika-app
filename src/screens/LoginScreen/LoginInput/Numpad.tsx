import * as React from 'react';

import { Colors } from '@kvika/theme';
import { ActivityIndicator } from 'react-native';
import KvikaText from '../../../components/KvikaText';
import NumpadButton from './NumpadButton';
import Backspace from '../../../svg/Backspace';
import ArrowRight from '../../../svg/ArrowRight';
import { FontSize, FontWeight } from '../../../dls/StyleGuide';
import { StyledColumn, StyledRow } from './NumpadStyles';
import { getButtonTextColor } from '../../../utils/Utils';

export enum Key {
  Backspace,
  Enter,
  Number,
}

type Props = {
  onPress(key: Key, value?: string): void;
  isSubmitEnabled: boolean;
  isLoading: boolean;
};

const Numpad = ({ onPress, isSubmitEnabled, isLoading }: Props) => {
  return (
    <StyledColumn>
      <StyledRow>
        <NumpadButton disabled={isLoading} onPress={() => onPress(Key.Number, '1')}>
          <KvikaText fontWeight={FontWeight.Light} fontSize={FontSize.XL} color={getButtonTextColor(isLoading)}>
            1
          </KvikaText>
        </NumpadButton>
        <NumpadButton disabled={isLoading} onPress={() => onPress(Key.Number, '2')}>
          <KvikaText fontWeight={FontWeight.Light} fontSize={FontSize.XL} color={getButtonTextColor(isLoading)}>
            2
          </KvikaText>
        </NumpadButton>
        <NumpadButton disabled={isLoading} onPress={() => onPress(Key.Number, '3')}>
          <KvikaText fontWeight={FontWeight.Light} fontSize={FontSize.XL} color={getButtonTextColor(isLoading)}>
            3
          </KvikaText>
        </NumpadButton>
      </StyledRow>
      <StyledRow>
        <NumpadButton disabled={isLoading} onPress={() => onPress(Key.Number, '4')}>
          <KvikaText fontWeight={FontWeight.Light} fontSize={FontSize.XL} color={getButtonTextColor(isLoading)}>
            4
          </KvikaText>
        </NumpadButton>
        <NumpadButton disabled={isLoading} onPress={() => onPress(Key.Number, '5')}>
          <KvikaText fontWeight={FontWeight.Light} fontSize={FontSize.XL} color={getButtonTextColor(isLoading)}>
            5
          </KvikaText>
        </NumpadButton>
        <NumpadButton disabled={isLoading} onPress={() => onPress(Key.Number, '6')}>
          <KvikaText fontWeight={FontWeight.Light} fontSize={FontSize.XL} color={getButtonTextColor(isLoading)}>
            6
          </KvikaText>
        </NumpadButton>
      </StyledRow>
      <StyledRow>
        <NumpadButton disabled={isLoading} onPress={() => onPress(Key.Number, '7')}>
          <KvikaText fontWeight={FontWeight.Light} fontSize={FontSize.XL} color={getButtonTextColor(isLoading)}>
            7
          </KvikaText>
        </NumpadButton>
        <NumpadButton disabled={isLoading} onPress={() => onPress(Key.Number, '8')}>
          <KvikaText fontWeight={FontWeight.Light} fontSize={FontSize.XL} color={getButtonTextColor(isLoading)}>
            8
          </KvikaText>
        </NumpadButton>
        <NumpadButton disabled={isLoading} onPress={() => onPress(Key.Number, '9')}>
          <KvikaText fontWeight={FontWeight.Light} fontSize={FontSize.XL} color={getButtonTextColor(isLoading)}>
            9
          </KvikaText>
        </NumpadButton>
      </StyledRow>
      <StyledRow>
        <NumpadButton disabled={isLoading} onPress={() => onPress(Key.Backspace)}>
          <Backspace color={isLoading ? Colors.goldGray600 : Colors.gold150} width={FontSize.XL} height={FontSize.XL} />
        </NumpadButton>
        <NumpadButton disabled={isLoading} onPress={() => onPress(Key.Number, '0')}>
          <KvikaText fontWeight={FontWeight.Light} fontSize={FontSize.XL} color={getButtonTextColor(isLoading)}>
            0
          </KvikaText>
        </NumpadButton>
        <NumpadButton onPress={() => onPress(Key.Enter)} disabled={!isSubmitEnabled}>
          {isLoading ? (
            <ActivityIndicator color={Colors.goldGray600} />
          ) : (
            <ArrowRight
              color={isSubmitEnabled ? Colors.gold150 : Colors.goldGray600}
              width={FontSize.XL}
              height={FontSize.XL}
            />
          )}
        </NumpadButton>
      </StyledRow>
    </StyledColumn>
  );
};

export default Numpad;
