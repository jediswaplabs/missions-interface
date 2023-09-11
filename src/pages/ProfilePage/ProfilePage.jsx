/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { SvgIcon } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import MainLayout from '../../layouts/MainLayout/MainLayout';
import { RoundedRect, ProfileHeading, ProfileText, LoadingContainer } from './ProfilePage.styles';
import start_claiming from '../../resources/icons/start_claiming.svg';
import { fetchProfileData, setWalletAddressAction } from './profileSlice';
import { useAccountDetails,
  useWalletActionHandlers } from '../../hooks/index.ts';
import GradientButton from '../../components/GradientButton/GradientButton';
import loading from '../../resources/gifs/Loading_gif.gif';

const ProfilePage = () => {
  const { address, chainId } = useAccountDetails();
  const { setWalletModalOpen } = useWalletActionHandlers();
  const { t } = useTranslation();

  const nftsClaimedByAUser = useSelector(
    (state) => state.profile.nftsClaimedByAUser,
  );

  const profileDataLoading = useSelector(
    (state) => state.profile.profileDataLoading,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setWalletAddressAction(address));
  }, [address]);

  useEffect(() => {
    if (address && chainId) {
      dispatch(fetchProfileData({ address, chainId }));
    }
  }, [address, chainId]);

  const getEmptyProfilePageContent = () => (
    <div style={{ maxWidth: '479px', margin: 'auto' }}>
      <SvgIcon
        component={start_claiming}
        width="479"
        viewBox=" 0 0 479 334"
        style={{ width: 'unset', height: 'unset', maxWidth: '90vw' }}
      />
      <ProfileHeading style={{ textAlign: 'center' }}>
        Start Claiming!
      </ProfileHeading>
      {address ? (
        <ProfileText>
          This is space where you’ll find all your claimed NFTs.
          <br />
          Start making your collection by participation in Jedi contests.
        </ProfileText>
      ) : (
        <ProfileText>
          Connect your wallet to see all your claimed NFTs at this place
        </ProfileText>
      )}
    </div>
  );

  const bodyContent = address ? (
    profileDataLoading ? (
      <LoadingContainer>
        <img src={loading} alt="Loading" style={{ width: '296px' }} />
      </LoadingContainer>
    ) : (
      <>
        {!nftsClaimedByAUser.length && getEmptyProfilePageContent()}
        {nftsClaimedByAUser.length !== 0 && (
          <div>
            <ProfileHeading>Claimed Missions</ProfileHeading>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="center"
              alignItems="center"
              // spacing={4}
              flexWrap="wrap"
              sx={{ my: 4 }}
            >
              {nftsClaimedByAUser.map((data, i) => (
                <RoundedRect key={i}>
                  <img
                    src={data.image_url}
                    alt=""
                    style={{ width: '200px', borderRadius: '5px' }}
                  />
                </RoundedRect>
              ))}
            </Stack>
          </div>
        )}
      </>
    )
  ) : (
    <div>
      {getEmptyProfilePageContent()}
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <GradientButton
          style={{ padding: '12px 48px' }}
          onClick={() => setWalletModalOpen(true)}
        >
          {t('header.connectWallet')}
        </GradientButton>
      </div>
    </div>
  );
  return <MainLayout bodyContent={bodyContent} disableSidebar />;
};

export default ProfilePage;
