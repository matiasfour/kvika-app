import * as React from 'react';
import { useSelector } from 'react-redux';
import { GeneralText, ProfileDrawerText } from '../../../constants/Text';
import { selectAvailableUserAccounts } from '../../../store/userAccount';
import SwitchProfile from '../../../svg/SwitchProfile';
import { StyledFooter, StyledKvikaButton } from './FooterStyles';

export type FooterProps = {
  onConfirm?: () => void;
  onDismiss?: () => void;
  onSwitchProfile?: () => void;
  confirmButtonText?: string;
  confirmButtonIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  dismissOnConfirm?: boolean;
  showBackButton?: boolean;
};

const Footer = ({
  onConfirm,
  onDismiss,
  confirmButtonText = GeneralText.Confirm,
  confirmButtonIcon,
  onSwitchProfile,
  isLoading,
  disabled,
  dismissOnConfirm = true,
  showBackButton = true,
}: FooterProps) => {
  const availableUserAccounts = useSelector(selectAvailableUserAccounts);
  return (
    <StyledFooter isProfileDrawer={Boolean(onSwitchProfile)}>
      {onSwitchProfile && availableUserAccounts.length > 1 && (
        <StyledKvikaButton
          icon={<SwitchProfile />}
          light
          title={ProfileDrawerText.SwitchProfile}
          onPress={onSwitchProfile}
        />
      )}
      {onDismiss && showBackButton && <StyledKvikaButton title={GeneralText.Cancel} onPress={onDismiss} light />}
      {onConfirm && (
        <StyledKvikaButton
          icon={confirmButtonIcon}
          title={confirmButtonText}
          onPress={() => {
            onConfirm();
            if (dismissOnConfirm) {
              onDismiss && onDismiss();
            }
          }}
          isLoading={isLoading}
          disabled={disabled}
        />
      )}
    </StyledFooter>
  );
};

export default Footer;
