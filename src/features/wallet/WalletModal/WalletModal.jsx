import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { UnsupportedChainIdError, useStarknetReact } from '@web3-starknet-react/core';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { SvgIcon } from '@mui/material';
import Box from '@mui/material/Box';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { NoStarknetProviderError as NoArgentXProviderError } from '@web3-starknet-react/argentx-connector';
import { NoStarknetProviderError as NoBraavosProviderError } from '@web3-starknet-react/braavos-connector';
import { useTranslation } from 'react-i18next';

import JediModal from '../../../components/JediModal/JediModal';
import { getStarkscanLink } from '../../../common/explorerHelper';
import { getShortenAddress } from '../../../common/addressHelper';
import { argentX, braavosWallet } from '../../../common/connectors';
import { SUPPORTED_WALLETS } from '../../../common/contansts';
import { usePrevious } from '../../../hooks';
import { ModalContainer, ModalInner, WalletConnectorContainer } from './WalletModal.styles';

const preventDefault = (event) => event.preventDefault();
const noop = () => {};

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

const WalletModal = ({ children, ...props }) => {
  const { t, i18n } = useTranslation();
  const [modalTitle, setModalTitle] = useState();

  const { active, connectedAddress, account, connector, activate, error, chainId } = useStarknetReact();
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
  const [pendingWallet, setPendingWallet] = useState();
  const [pendingError, setPendingError] = useState();
  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);

  useEffect(() => {
    if (((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [setWalletView, active, error, connector, activePrevious, connectorPrevious]);

  const getConnectedWalletOptions = () => {
    const option = Object.values(SUPPORTED_WALLETS).filter((w) => w.connector === connector);
    return option?.[0] ?? {};
  };

  const tryActivation = async (walletConnector) => {
    if (!walletConnector) {
      return;
    }
    setPendingWallet(connector); // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING);

    try {
      await activate(walletConnector, (e) => console.error('Error activating connector', walletConnector, e), true);
      if (walletConnector === argentX) {
        localStorage?.setItem('auto-injected-wallet', 'argentx');
      } else if (walletConnector === braavosWallet) {
        localStorage?.setItem('auto-injected-wallet', 'braavos');
      } else {
        localStorage?.removeItem('auto-injected-wallet');
      }
    } catch (e) {
      if (e instanceof UnsupportedChainIdError) {
        await activate(walletConnector); // a little janky...can't use setError because the connector isn't set
      } else {
        console.error(e);
        setPendingError(e);
      }
    }
  };

  useEffect(() => {
    if (error) {
      setModalTitle(error instanceof UnsupportedChainIdError ? t('walletModal.errors.wrongNetwork') : t('walletModal.errors.connectingError'));
      return;
    }

    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      setModalTitle(t('walletModal.titleAccountDetails'));
      return;
    }

    setModalTitle(t('walletModal.titleConnect'));
  }, [walletView, error, account, i18n.language]);

  const handleOnOptionClick = useCallback(async (option) => {
    if (option.connector === connector) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
      return;
    }
    if (option.href) {
      return;
    }
    await tryActivation(option.connector);
  }, [connector]);

  const getContent = () => {
    if (error) {
      return (
        <>
          {error instanceof UnsupportedChainIdError ? (
            <Typography variant="body2" color="text.primary">{t('walletModal.errors.connectAppropriateNetwork')}</Typography>
          ) : (
            <Typography variant="body2" component="span" color="text.primary">{t('walletModal.errors.tryRefresh')}</Typography>
          )}
        </>
      );
    }

    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <>
          <WalletAccountOverview connectedWallet={getConnectedWalletOptions()} account={account} chainId={chainId} connectedAddress={connectedAddress} onWalletDisconnect={() => { connector?.deactivate(); }} />
        </>
      );
    }

    return (
      <>
        {walletView === WALLET_VIEWS.PENDING ? (
          <WalletPending
            connector={pendingWallet}
            error={pendingError}
            setPendingError={setPendingError}
            tryActivation={tryActivation}
            setWalletView={setWalletView}
          />
        ) : (
          <WalletConnectOptionsView onClick={handleOnOptionClick} wallets={SUPPORTED_WALLETS} />
        )}
      </>
    );
  };

  const handleOnClose = useCallback(
    () => {
      props?.onClose?.();
      setWalletView(WALLET_VIEWS.ACCOUNT);
    },
    [],
  );

  return (
    <JediModal {...props} onClose={handleOnClose} fullWidth contentSx={{ maxWidth: '400px' }}>
      <ModalInner>
        <Stack direction="column" gap={1}>
          <Grid container direction="row" alignItems="center" justifyContent="space-between">
            <Grid item>{modalTitle && <Typography variant="h6" component="span" color="text.primary">{modalTitle}</Typography>}</Grid>
            <Grid item>
              <IconButton aria-label="delete" size="small" onClick={handleOnClose}>
                <CloseIcon color="primary" />
              </IconButton>
            </Grid>
          </Grid>
          <WalletConnectorContainer>
            {getContent()}
          </WalletConnectorContainer>
        </Stack>
      </ModalInner>
    </JediModal>
  );
};

const WalletConnectOptionsView = ({ onClick = noop, wallets = {} }) => (
  <Stack direction="column" gap={2}>
    {Object.values(wallets).map((option) => (
      <React.Fragment key={option.name}>
        <Button
          variant="outlined"
          fullWidth
          endIcon={<SvgIcon component={option.icon} />}
          onClick={() => onClick(option)}
          sx={{ justifyContent: 'space-between', height: 60, color: option.color || '' }}
        >{option.name}
        </Button>
      </React.Fragment>
    ))}
  </Stack>
);

const WalletAccountOverview = ({ connectedWallet, chainId, connectedAddress, onWalletDisconnect = noop() }) => {
  const { t } = useTranslation();
  const [isAddressCopied, setIsAddressCopied] = useState(false);
  useEffect(() => {
    if (!isAddressCopied) {
      return;
    }
    setTimeout(() => {
      setIsAddressCopied(false);
    }, 1000);
  }, [isAddressCopied]);

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row" gap={2} alignItems="center" justifyContent="space-between">
        <Typography variant="body2" component="span" color="text.primary">{t('walletModal.connectedWith', { wallet: connectedWallet?.name })}</Typography>
        <Button variant="outlined" onClick={onWalletDisconnect}>{t('walletModal.disconnect')}</Button>
      </Stack>

      <Box component="div" sx={{ p: 2, border: '1px solid rgba(80,213,255,0.5);', color: connectedWallet.color || '', borderRadius: '4px' }}>
        <Grid container direction="row" alignItems="center" gap={1}>
          <Grid item sx={{ display: 'inline-flex' }}>
            <SvgIcon component={connectedWallet.icon} />
          </Grid>
          <Grid item>
            <Typography variant="body1" component="span">{getShortenAddress(connectedAddress)}</Typography>
          </Grid>
        </Grid>
      </Box>

      <Stack gap={1} flexDirection="row" alignItems="flex-start">
        {connectedAddress && (
          <Grid container direction="row" alignItems="center" gap={0.5} width="auto" wrap="nowrap">
            <Grid item>
              <ContentCopyIcon color="primary" fontSize="small" />
            </Grid>
            <Grid item>
              {isAddressCopied ? (
                <Typography variant="body2" component="span" color="grey.400">{t('walletModal.copied')}</Typography>
              ) : (
                <CopyToClipboard text={connectedAddress} onCopy={() => setIsAddressCopied(true)}>
                  <Link component="button" underline="none" variant="body2" color="grey.400" onClick={preventDefault}>{t('walletModal.copyAddress')}</Link>
                </CopyToClipboard>
              )}
            </Grid>
          </Grid>
        )}

        <Grid container direction="row" alignItems="center" gap={0.5} width="auto" wrap="nowrap">
          <Grid item>
            <OpenInNewIcon color="primary" fontSize="small" />
          </Grid>
          <Grid item>
            <Link component="a" underline="none" variant="body2" color="grey.400" target="_blank" rel="noopener noreferrer" href={getStarkscanLink(chainId, connectedAddress, 'contract')}>{t('walletModal.viewOnStarkscan')}</Link>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

const WalletPending = ({ connector, error = false, setPendingError, setWalletView, tryActivation }) => {
  const isArgentXProviderError = error instanceof NoArgentXProviderError;
  const isBraavosProviderError = error instanceof NoBraavosProviderError;
  const isStarknetProviderError = isArgentXProviderError || isBraavosProviderError;

  return (
    <>
      {/* eslint-disable-next-line no-nested-ternary */}
      {error ? (
        isStarknetProviderError ? (
          <ProviderError
            error={error}
            onClick={() => {
              setPendingError(false);
              setWalletView(WALLET_VIEWS.OPTIONS);
            }}
          />
        ) : (
          <>
            <Typography variant="body2" component="span" color="text.primary">Error connecting.</Typography>
            <Button
              onClick={() => {
                setPendingError(false);
                tryActivation(connector);
              }}
            >
              Try Again
            </Button>
          </>
        )
      ) : (
        <Typography variant="body2" component="span" color="text.primary">Initializing...</Typography>
      )}
    </>
  );
};

const ProviderError = ({ error, onClick }) => {
  const { t } = useTranslation();
  const argentXUrl = 'https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb';
  const braavosUrl = 'https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma';
  const downloadArgentX = () => window.open(argentXUrl, '_blank');
  const downloadBraavos = () => window.open(braavosUrl, '_blank');
  const isArgentXError = error instanceof NoArgentXProviderError;

  const handleDownloadButtonClick = useCallback(() => {
    if (isArgentXError) {
      downloadArgentX();
    } else {
      downloadBraavos();
    }
    onClick();
  }, [isArgentXError, onClick]);

  return (
    <Stack direction="row" gap={2} alignItems="center" justifyContent="space-between">
      <Typography variant="body2" component="span" color="text.primary">{t('walletModal.walletNotFound', { wallet: isArgentXError ? 'ArgentX' : 'Braavos' })}</Typography>
      <Button variant="outlined" onClick={handleDownloadButtonClick}>{t('walletModal.downloadNow')}
      </Button>
    </Stack>
  );
};

export default WalletModal;

export {
  WalletConnectOptionsView,
  WalletAccountOverview,
  WalletPending,
};
