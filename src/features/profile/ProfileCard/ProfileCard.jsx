import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Skeleton from '@mui/material/Skeleton';

import { BoxContainer, Cover, AccountInfoContainer, WalletContainer, AccountAvatar, AccountAddress, AccountControls, SwitchAccount } from './ProfileCard.styles';
import UserAvatar from '../UserAvatar/UserAvatar';
import SelectProfilePictureModal from '../SelectProfilePictureModal/SelectProfilePictureModal';
import WalletBalance from '../../wallet/WalletBalance/WalletBalance';
import GradientButton from '../../../components/GradientButton/GradientButton';
import { useLazyGetUserByIdQuery } from '../../api/apiSlice';
import { EventEmitter } from '../../../common/eventEmitter';
import { eventsLookup } from '../../../common/contansts';
import { getShortenAddress } from '../../../common/addressHelper';

const preventDefault = (event) => event.preventDefault();

const ProfileCard = ({ account, readOnly = true }) => {
  const { t } = useTranslation();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const handleToggleEditProfileModal = useCallback(() => {
    setShowEditProfileModal(!showEditProfileModal);
  }, [showEditProfileModal]);

  const handleCloseEditProfileModal = useCallback(() => {
    setShowEditProfileModal(false);
  }, [showEditProfileModal]);

  const [getUserById, {
    data: user,
    isFetching,
    isSuccess, // eslint-disable-line no-unused-vars
    isError,
    isUninitialized,
  }] = useLazyGetUserByIdQuery();

  useEffect(() => {
    if (!account) { return; }
    getUserById(account);
  }, [account]);

  const handleSwitchAccount = useCallback(() => {
    EventEmitter.dispatch(eventsLookup.openWalletModal);
  }, []);

  const [isAddressCopied, setIsAddressCopied] = useState(false);

  const userAvatarUrl = user?.avatar ?? '';
  const userAddress = account ?? '';

  useEffect(() => {
    if (!isAddressCopied) {
      return;
    }
    setTimeout(() => {
      setIsAddressCopied(false);
    }, 1000);
  }, [isAddressCopied]);

  let content;
  if (isError) {
    content = <ErrorProfile />;
  } else {
    content = (
      <>
        <div data-testid={isFetching || isUninitialized ? 'loading_account' : null} />
        <AccountAvatar>
          <UserAvatar src={userAvatarUrl} isMock={isFetching || isUninitialized} />
        </AccountAvatar>
        <AccountAddress>
          <Typography variant="h5" component="div" color="text.primary">{isFetching || isUninitialized ? <Skeleton width="100%" /> : getShortenAddress(userAddress)}</Typography>
        </AccountAddress>
        {!readOnly && (
          <AccountControls>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            > {isFetching || isUninitialized
                ? <Skeleton variant="rounded" width="100%" height="2rem" />
                : (
                  <>
                    <div className="account-controls-item">
                      <GradientButton variant="outlined" size="small" onClick={handleToggleEditProfileModal}>
                        {t('profileCard.controls.editProfile')}
                      </GradientButton>
                    </div>
                    <div className="account-controls-item">
                      {isAddressCopied ? (
                        <Typography variant="body2" component="span" color="text.primary">{t('profileCard.controls.copied')}</Typography>
                      ) : (
                        <CopyToClipboard text={userAddress} onCopy={() => setIsAddressCopied(true)}>
                          <Link component="button" underline="none" variant="body2" onClick={preventDefault}>
                            {t('profileCard.controls.copyAddress')}
                          </Link>
                        </CopyToClipboard>
                      )}
                    </div>
                  </>
                )}
            </Stack>
          </AccountControls>
        )}
        {!readOnly && (
          <SwitchAccount>
            {isFetching || isUninitialized
              ? <Skeleton variant="rounded" width="100%" height="3rem" />
              : (
                <Button variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleSwitchAccount}
                  fullWidth
                  startIcon={<SyncAltIcon />}
                >{t('profileCard.controls.switchAccount')}
                </Button>
              )}
          </SwitchAccount>
        )}
      </>
    );
  }

  return (
    <BoxContainer>
      <Cover />
      <AccountInfoContainer>
        {content}
      </AccountInfoContainer>
      <WalletContainer>
        <WalletBalance account={account} />
      </WalletContainer>

      <SelectProfilePictureModal open={showEditProfileModal} onClose={handleCloseEditProfileModal} />
    </BoxContainer>
  );
};

const ErrorProfile = () => {
  const { t } = useTranslation();
  return (
    <Typography variant="body1" color="text.primary" sx={{ margin: '16px 0' }} data-testid="error_account">
      {t('profileCard.errors.fetching')}
    </Typography>
  );
};

ProfileCard.propTypes = {
  account: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default ProfileCard;
