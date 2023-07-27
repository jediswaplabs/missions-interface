import React, { useCallback, useState } from 'react';
import { UnsupportedChainIdError, useStarknetReact } from '@web3-starknet-react/core';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SvgIcon } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

import { HeaderContainer, HeaderLogo, HeaderWallet, AccountElement, Web3StatusConnected, Web3StatusError, Web3StatusConnect } from './Header.styles';
import { useActiveStarknetReact } from '../../hooks';
import { eventsLookup, NETWORK_LABELS } from '../../common/contansts';
import { argentX, braavosWallet } from '../../common/connectors';
import { getShortenAddress } from '../../common/addressHelper';
import { EventEmitter } from '../../common/eventEmitter';
import logo from '../../resources/images/logo.png';
import argentXIcon from '../../resources/icons/argentx.svg';
import braavosIcon from '../../resources/icons/braavos.svg';
import GradientButton from '../GradientButton/GradientButton';
import WalletModal from '../../features/wallet/WalletModal/WalletModal';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const noop = () => { };

const Header = () => {
  const { chainId } = useStarknetReact();

  return (
    <HeaderContainer py={1}>
      <Grid container columnSpacing={{ md: 2 }} alignItems="center">
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <HeaderLogo to="/home">
            <div>
              <svg width="88" height="20" viewBox="0 0 88 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.56269 13.4545L8.74285 12.2523L13.2599 8.86309L14.9311 11.3059C15.3605 10.7176 15.6475 10.0653 15.7816 9.3363C15.9909 8.19804 15.7713 7.22604 15.1227 6.4203C14.4613 5.61457 13.5575 5.21809 12.3881 5.21809H10.9745C9.80509 5.21809 8.75552 5.61457 7.79775 6.4203C6.85282 7.22604 6.2757 8.19804 6.06638 9.3363C5.85706 10.4746 6.08954 11.4466 6.75097 12.2523C7.4124 13.058 8.31616 13.4545 9.45988 13.4545H9.56269ZM13.7913 19.6702L12.8 18.2122C11.8639 18.4808 10.9152 18.6086 9.92565 18.6086H8.51206C5.92904 18.6086 3.89854 17.7006 2.41819 15.8973C0.937844 14.094 0.427613 11.907 0.900349 9.3363C1.37073 6.77841 2.68532 4.59141 4.82891 2.7881C6.97249 0.984787 9.33697 0.0767367 11.92 0.0767367H13.3336C15.9166 0.0767367 17.9471 0.984787 19.4274 2.7881C20.9078 4.59141 21.418 6.77841 20.9476 9.3363C20.5243 11.6384 19.4249 13.6335 17.6623 15.3218L18.3084 16.281L13.7913 19.6702Z" fill="#2AAAFD" />
                <path d="M33.7107 10.7303L35.684 0H40.8629L38.8896 10.7303C38.4898 12.9046 37.3777 14.759 35.5405 16.2938C33.701 17.8413 31.6965 18.6086 29.5119 18.6086C27.3272 18.6086 25.605 17.8413 24.3474 16.2938C23.0747 14.759 22.6447 12.9046 23.0445 10.7303L25.0178 0H30.1967L28.2234 10.7303C28.0846 11.4849 28.2369 12.1244 28.665 12.6616C29.1083 13.1859 29.7015 13.4545 30.4597 13.4545C31.2179 13.4545 31.9227 13.1859 32.5588 12.6616C33.1845 12.1244 33.5719 11.4849 33.7107 10.7303Z" fill="#2AAAFD" />
                <path d="M62.6685 18.6086H39.8069L43.2148 0.0767367H56.7082L55.7627 5.21809H47.4482L47.1637 6.76562H55.4781L54.5303 11.9198H46.2158L45.9336 13.4545H62.1385C59.0531 9.61766 57.4294 7.54577 57.2826 7.22604C56.8781 6.4203 56.7635 5.5762 56.9234 4.70652C57.1539 3.45315 57.7779 2.36605 58.8059 1.458C59.8362 0.537157 60.9618 0.0767367 62.1827 0.0767367H70.2401L69.2947 5.21809H62.715C62.736 5.24367 63.5211 6.21567 65.055 8.14688C66.6042 10.0653 67.4533 11.178 67.592 11.4721C67.9859 12.2651 68.1029 13.0964 67.9406 13.9789C67.7125 15.2194 67.0756 16.3065 66.0453 17.2274C65.0021 18.1482 63.8765 18.6086 62.6685 18.6086Z" fill="#2AAAFD" />
                <path d="M72.8632 0.0767367H87.6031L86.6577 5.21809H81.8772L79.4147 18.6086H74.2358L76.6983 5.21809H71.9178L72.8632 0.0767367Z" fill="#2AAAFD" />
              </svg>
            </div>
            <div>
              <svg width="72" height="10" viewBox="0 0 72 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.433773 7.43031L1.80017 0H2.99936L2.39027 3.31219H2.42025C2.72611 3.00751 3.28169 2.59471 4.18109 2.59471C5.55016 2.59471 6.30071 3.67584 6.04406 5.07148C5.7874 6.46712 4.69919 7.54825 3.22019 7.54825C2.55064 7.54825 1.96806 7.29271 1.72312 6.72266H1.70314L1.573 7.43031H0.433773ZM4.84486 5.07148C4.98042 4.33435 4.57549 3.65618 3.69608 3.65618C2.81668 3.65618 2.16232 4.33435 2.02677 5.07148C1.89121 5.80861 2.29614 6.48678 3.17555 6.48678C4.05496 6.48678 4.70931 5.80861 4.84486 5.07148Z" fill="white" />
                <path d="M8.76974 7.46962L7.59591 2.71265H8.91501L9.65225 5.98553H9.67223L11.4733 2.71265H12.7224L9.40026 8.44264C8.88783 9.3272 8.38316 9.78913 7.32388 9.78913C7.01409 9.78913 6.71153 9.74982 6.42619 9.67119L6.77129 8.60972C6.94851 8.67852 7.14933 8.72766 7.35919 8.72766C7.94879 8.72766 8.14664 8.52126 8.43687 8.02984L8.76974 7.46962Z" fill="white" />
                <path d="M21.6733 0.471766L20.7479 5.50393C20.5437 6.61455 19.6516 7.60722 18.2326 7.60722C17.1233 7.60722 16.466 7.10597 16.4486 6.00518L17.6784 5.72999C17.6752 6.18209 17.9389 6.48678 18.3786 6.48678C19.0982 6.48678 19.402 5.9757 19.5556 5.14028L20.4141 0.471766H21.6733Z" fill="white" />
                <path d="M22.5722 7.43031L23.8518 0.471766H28.5387L28.3326 1.59221H24.9049L24.5904 3.30236H27.8383L27.6322 4.4228H24.3844L24.0374 6.30986H27.6449L27.4389 7.43031H22.5722Z" fill="white" />
                <path d="M29.3309 7.43031L30.6105 0.471766H33.3987C35.2574 0.471766 36.7902 1.59221 36.3564 3.95104C35.919 6.32952 33.668 7.43031 31.9691 7.43031H29.3309ZM30.7961 6.30986H31.7355C33.3144 6.30986 34.7264 5.64153 35.0373 3.95104C35.3482 2.26054 34.3518 1.59221 32.8129 1.59221H31.6637L30.7961 6.30986Z" fill="white" />
                <path d="M37.5333 7.43031L38.8129 0.471766H40.072L38.7924 7.43031H37.5333Z" fill="white" />
                <path d="M46.5614 1.01233L45.4667 1.96569C45.2656 1.59221 44.8184 1.4153 44.3287 1.4153C43.7491 1.4153 43.1225 1.67084 43.0051 2.30969C42.7484 3.70532 46.2525 2.90922 45.7971 5.38599C45.5223 6.87991 44.1894 7.60722 42.8003 7.60722C41.9209 7.60722 41.1103 7.34185 40.6554 6.66369L41.7711 5.75947C41.9959 6.22141 42.4767 6.48678 43.0364 6.48678C43.616 6.48678 44.3334 6.17227 44.4509 5.53342C44.731 4.01001 41.2124 4.88474 41.6697 2.39814C41.9336 0.963188 43.3556 0.294854 44.6647 0.294854C45.4042 0.294854 46.1058 0.501251 46.5614 1.01233Z" fill="white" />
                <path d="M48.6811 7.43031L47.8722 0.471766H49.2512L49.6586 5.48427H49.6785L52.1893 0.471766H53.4284L54.0656 5.48427H54.0856L56.3964 0.471766H57.6756L54.3373 7.43031H53.1381L52.4734 2.13277H52.4534L49.8403 7.43031H48.6811Z" fill="white" />
                <path d="M56.7962 7.43031L61.1538 0.471766H62.243L64.0113 7.43031H62.5723L62.2055 5.8381H59.1376L58.2052 7.43031H56.7962ZM59.7625 4.77663H61.961L61.3923 1.94603L59.7625 4.77663Z" fill="white" />
                <path d="M65.4471 7.43031L66.7268 0.471766H69.1052C70.4742 0.471766 71.6267 0.943531 71.3429 2.4866C71.0212 4.23606 69.6342 4.55057 68.1353 4.55057H67.2359L66.7063 7.43031H65.4471ZM67.4311 3.4891H68.1905C68.9101 3.4891 69.8467 3.44979 70.0202 2.50625C70.1774 1.65118 69.3697 1.53324 68.6901 1.53324H67.7907L67.4311 3.4891Z" fill="white" />
              </svg>
            </div>
          </HeaderLogo>
        </Grid>
        <Grid item
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
            <Stack direction="row" alignItems="center" gap={2}>
              <Link to={`/home`}>
                <Typography variant="body1" color="white">Quests</Typography>
              </Link>
              <Link to={`/profile`}>
                <Typography variant="body1" color="white">My Profile</Typography>
              </Link>
              {/* {chainId && NETWORK_LABELS[chainId] && (
                  <Typography variant="body1" color="text.primary">Starknet-{NETWORK_LABELS[chainId]}</Typography>
                )} */}
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
  if (connector === argentX) { return (<SvgIcon component={argentXIcon} />); }
  if (connector === braavosWallet) { return (<SvgIcon component={braavosIcon} />); }
  return null;
};

const Web3Status = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleWalletModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const handleCloseWalletModal = useCallback(() => {
    setShowModal(false);
  }, [showModal]);

  const handleOpenWalletModal = useCallback(() => {
    setShowModal(true);
  }, [showModal]);

  EventEmitter.subscribe(eventsLookup.openWalletModal, handleOpenWalletModal);

  return (
    <>
      <Web3StatusInner onWalletModalToggle={handleToggleWalletModal} />
      <WalletModal open={showModal} onClose={handleCloseWalletModal} />
    </>
  );
};

const Web3StatusInner = ({ onWalletModalToggle = noop }) => {
  const { t } = useTranslation();
  const { connectedAddress, connector, error } = useActiveStarknetReact();
  if (connectedAddress) {
    return (
      <Web3StatusConnected onClick={onWalletModalToggle}>
        <Stack direction="row" alignItems="center" gap={1}>
          {connector && <StatusIcon connector={connector} />}
          <Typography variant="body1" color="text.primary">{getShortenAddress(connectedAddress)}</Typography>
        </Stack>
      </Web3StatusConnected>
    );
  } if (error) {
    return (
      <Web3StatusError onClick={onWalletModalToggle}>
        <Typography variant="body1" color="text.primary">{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}</Typography>
      </Web3StatusError>
    );
  }
  return (
    <Web3StatusConnect onClick={onWalletModalToggle}>
      <GradientButton>{t('header.connectWallet')}</GradientButton>
    </Web3StatusConnect>
  );
};

export default Header;
