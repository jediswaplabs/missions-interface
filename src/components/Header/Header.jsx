import React, { useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SvgIcon } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { HeaderContainer,
  HeaderLogo,
  AccountElement,
  Web3StatusConnected,
  Web3StatusConnect,
  ActiveLink,
  HeaderSelectionBar,
  NetworkCard,
  AddressCard } from './Header.styles';
import { useAccountDetails,
  useWalletActionHandlers } from '../../hooks/index.ts';
import { eventsLookup } from '../../common/constants';
import { isProductionChainId } from '../../common/connectors/index.ts';
import { getShortenAddress } from '../../common/addressHelper';
import { EventEmitter } from '../../common/eventEmitter';
import logo from '../../resources/icons/logo.svg';
import argentXIcon from '../../resources/icons/argentx.svg';
import braavosIcon from '../../resources/icons/braavos.svg';
import GradientButton from '../GradientButton/GradientButton';
import WalletModal from '../../features/wallet/WalletModal/WalletModal';
import ProfilePopout from '../ProfilePopout/ProfilePopout';

const noop = () => {};

const Header = () => {
  const location = useLocation();
  const closeProfilePopout = useSelector(
    (state) => state.profile.closeProfilePopout,
  );

  const { status, chainId } = useAccountDetails();

  return (
    <HeaderContainer py={1}>
      <Grid container columnSpacing={{ md: 2 }} alignItems="center">
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <HeaderLogo to="/">
            <SvgIcon
              component={logo}
              viewBox="0 0 173 34"
              style={{ width: 'unset', height: 'unset' }}
            />
          </HeaderLogo>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: { xs: 'fixed', md: 'static' },
            zIndex: 1,
            width: { xs: '100%', md: 'auto' },
            bottom: 0,
            left: 0,
          }}
        >
          <Box
            display="flex"
            width="100%"
            backgroundColor={{ xs: '#212429', md: 'transparent' }}
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
            px={{ xs: 2, md: 0 }}
            py={{ xs: 2, md: 0 }}
          >
            {/* <LanguageSwitcher /> */}
            {/* <HeaderWallet> */}
            <Stack direction="row" alignItems="flex-start" gap={5}>
              {location.pathname === '/mission' ? (
                <ActiveLink to="/mission">
                  <Typography variant="body1" color="white">
                    Missions
                  </Typography>
                  <HeaderSelectionBar />
                </ActiveLink>
              ) : (
                <Link to="/mission">
                  <Typography
                    variant="body1"
                    color="white"
                    style={{ fontSize: '16px' }}
                  >
                    Missions
                  </Typography>
                </Link>
              )}
              {location.pathname === '/profile' ? (
                <ActiveLink to="/profile">
                  <Typography variant="body1" color="white">
                    Profile
                  </Typography>
                  <HeaderSelectionBar />
                </ActiveLink>
              ) : (
                <>
                  <Link to="/profile">
                    <Typography
                      variant="body1"
                      color="white"
                      style={{ fontSize: '16px' }}
                    >
                      Profile
                    </Typography>
                  </Link>
                  {!closeProfilePopout && <ProfilePopout />}
                </>
              )}
              {status === 'connected'
                && (isProductionChainId(chainId) ? (
                  <NetworkCard title="Starknet Mainnet">
                    Starknet Mainnet
                  </NetworkCard>
                ) : (
                  <NetworkCard title="Starknet Görli">
                    Starknet Görli
                  </NetworkCard>
                ))}
              <AccountElement>
                <Web3Status />
              </AccountElement>
            </Stack>
            {/* </HeaderWallet> */}
          </Box>
        </Grid>
      </Grid>
    </HeaderContainer>
  );
};

const StatusIcon = ({ connector }) => {
  if (connector?.options?.id === 'argentX') {
    return (
      <SvgIcon
        component={argentXIcon}
        style={{
          width: '16px',
          height: '16px',
        }}
      />
    );
  }
  if (connector?.options?.id === 'braavos') {
    return (
      <SvgIcon
        component={braavosIcon}
        style={{
          width: '16px',
          height: '16px',
        }}
      />
    );
  }
  return null;
};

const Web3Status = () => {
  const { setWalletModalOpen } = useWalletActionHandlers();
  const isWalletModalOpen = useSelector(
    (state) => state.wallet.isWalletModalOpen,
  );

  const handleToggleWalletModal = useCallback(() => {
    setWalletModalOpen(!isWalletModalOpen);
  }, [isWalletModalOpen]);

  const handleCloseWalletModal = useCallback(() => {
    setWalletModalOpen(false);
  }, [isWalletModalOpen]);

  const handleOpenWalletModal = useCallback(() => {
    setWalletModalOpen(true);
  }, [isWalletModalOpen]);

  EventEmitter.subscribe(eventsLookup.openWalletModal, handleOpenWalletModal);

  return (
    <>
      <Web3StatusInner onWalletModalToggle={handleToggleWalletModal} />
      <WalletModal open={isWalletModalOpen} onClose={handleCloseWalletModal} />
    </>
  );
};

const Web3StatusInner = ({ onWalletModalToggle = noop }) => {
  const { t } = useTranslation();
  // const { error } = useAccountDetails();
  const { address, connector } = useAccountDetails();
  if (address) {
    return (
      <Web3StatusConnected onClick={onWalletModalToggle}>
        <Stack direction="row" alignItems="center" gap={1}>
          <AddressCard>
            {connector && <StatusIcon connector={connector} />}
            <Typography
              variant="body1"
              color="text.primary"
              style={{
                fontSize: '16px',
                fontFamily: '"Avenir LT Std", sans-serif',
                fontWeight: '600',
                marginLeft: '4px',
                lineHeight: '1',
              }}
            >
              {getShortenAddress(address)}
            </Typography>
          </AddressCard>
        </Stack>
      </Web3StatusConnected>
    );
  }
  // if (error) {
  //   return (
  //     <Web3StatusError onClick={onWalletModalToggle}>
  //       <Typography variant="body1" color="text.primary">
  //         {error ? 'Wrong Network' : 'Error'}
  //       </Typography>
  //     </Web3StatusError>
  //   );
  // }
  return (
    <Web3StatusConnect onClick={onWalletModalToggle}>
      <GradientButton>{t('header.connectWallet')}</GradientButton>
    </Web3StatusConnect>
  );
};

export default Header;
