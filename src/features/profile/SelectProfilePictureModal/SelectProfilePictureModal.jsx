/* eslint-disable import/no-unresolved, no-param-reassign, no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useStarknetReact } from '@web3-starknet-react/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';
import { EffectFade, Navigation } from 'swiper';
import cn from 'classnames';
import 'swiper/css';
import 'swiper/css/bundle';

import { Cover, ModalInner, IntroductionStepAvatarGroups, IntroductionStepContainer, IntroductionStepTitles, NextStepButton, SelectNftStepContainer, SelectProfilePictureFormContainer, SelectNftStepTitle, SelectNftStepSlider, SliderNavigationArrowPrev, SliderNavigationArrowNext, SelectNftStepSliderCounter, FinalStepContainer, FinalStepAvatar, FinalStepDescription, IntroductionStepContainerInner, SelectNftStepContainerInner, FinalStepContainerInner } from './SelectProfilePictureModal.styles';
import JediModal from '../../../components/JediModal/JediModal';
import UserAvatar from '../UserAvatar/UserAvatar';
import { useLazyGetMeshNftByUserIdQuery } from '../../api/apiSlice';
import { IMAGE_MODEL } from '../../nft/NftCard/NftCard';

const noop = () => {};

const AMOUNT_OF_STEPS = 3;

const SelectProfilePictureModal = ({ children, ...props }) => {
  const { account } = useStarknetReact();

  const handleOnClose = useCallback(() => {
    props?.onClose?.();
  }, []);

  const handleOnFormClose = useCallback(() => {
    props?.onClose?.();
  }, []);

  return (
    <JediModal {...props} onClose={handleOnClose} fullWidth contentSx={{ maxWidth: '600px', padding: 0 }}>
      <ModalInner>
        <SelectProfilePictureForm account={account} onFormClose={handleOnFormClose} />
      </ModalInner>
    </JediModal>
  );
};

const SelectProfilePictureForm = ({ account, onFormClose = noop }) => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedNftId, setSelectedNftId] = useState(null);
  const [error, setError] = useState(null);

  const handleOnNextStep = useCallback(() => {
    if ((activeStep + 1) >= AMOUNT_OF_STEPS) {
      onFormClose();
      return;
    }
    setActiveStep(activeStep + 1);
  }, [activeStep]);

  const handleOnNftSelected = useCallback((id) => {
    setSelectedNftId(id);
  }, []);

  const handleOnStepError = useCallback((errorMessage = null) => {
    setError(errorMessage);
  }, []);

  const [getMeshNftByUserId, {
    data: nfts = {},
    isFetching,
    isSuccess: isFetchSuccess,
    isError: isFetchError,
    isUninitialized: isFetchUninitialized,
  }] = useLazyGetMeshNftByUserIdQuery();

  useEffect(() => {
    if (!account) {
      setError(t('selectProfilePictureModal.errors.noAccount'));
      return;
    }
    getMeshNftByUserId(account);
  }, [account]);

  useEffect(() => {
    if (!isFetchError) { return; }
    setError(t('selectProfilePictureModal.errors.fetching'));
  }, [isFetchError]);

  let content;
  if (error) {
    content = <ErrorSelectProfilePictureForm errorText={error} />;
  } else if (isFetching || isFetchUninitialized) {
    content = <MockSelectProfilePictureForm />;
  } else if (isFetchSuccess) {
    content = (
      <>
        {(activeStep === 0) && (
          <IntroductionStep
            onNextStep={handleOnNextStep}
            onError={handleOnStepError}
          />
        )}
        {(activeStep === 1) && (
          <SelectNftStep
            nfts={nfts}
            onNextStep={handleOnNextStep}
            onError={handleOnStepError}
            onNftSelected={handleOnNftSelected}
          />
        )}
        {(activeStep === 2) && (
          <FinalStep
            nft={nfts?.entities?.[selectedNftId]?.image}
            onNextStep={handleOnNextStep}
            onError={handleOnStepError}
          />
        )}
      </>
    );
  }

  return (
    <SelectProfilePictureFormContainer>
      {content}
    </SelectProfilePictureFormContainer>
  );
};

const MockSelectProfilePictureForm = () => (
  <IntroductionStepContainer data-testid="loading_profile_picture_form">
    <Cover />
    <IntroductionStepContainerInner>
      <IntroductionStepAvatarGroups>
        <UserAvatar size="90px" isMock />
        <UserAvatar size="120px" isMock />
        <UserAvatar size="90px" isMock />
      </IntroductionStepAvatarGroups>
      <IntroductionStepTitles>
        <Stack gap={1.5} alignItems="center">
          <Typography variant="h5" component="span" color="text.primary"><Skeleton variant="text" width="12em" /></Typography>
          <Typography variant="subtitle1" component="span" color="text.primary"><Skeleton variant="text" width="8em" /></Typography>
        </Stack>
      </IntroductionStepTitles>
      <Skeleton variant="rectangular" width={390} height={64} />
    </IntroductionStepContainerInner>
  </IntroductionStepContainer>
);

const ErrorSelectProfilePictureForm = ({ errorText = '' }) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', p: 2 }} data-testid="error_profile_picture_form">
      <Typography variant="body1" color="text.primary">
        {errorText || t('selectProfilePictureModal.errors.unknown')}
      </Typography>
    </Box>
  );
};

const IntroductionStep = ({ onNextStep = noop, onError = noop }) => {
  const { t } = useTranslation();
  return (
    <IntroductionStepContainer>
      <Cover />
      <IntroductionStepContainerInner>
        <IntroductionStepAvatarGroups>
          <UserAvatar size="90px" />
          <UserAvatar size="120px" />
          <UserAvatar size="90px" />
        </IntroductionStepAvatarGroups>
        <IntroductionStepTitles>
          <Stack gap={1.5}>
            <Typography variant="h5" component="span" color="text.primary">{t('selectProfilePictureModal.introductionStep.title')}</Typography>
            <Typography variant="subtitle1" component="span" color="text.primary">{t('selectProfilePictureModal.introductionStep.subtitle')}</Typography>
          </Stack>
        </IntroductionStepTitles>
        <NextStepButton onClick={onNextStep}>
          <Typography variant="h5" component="span" color="text.primary">{t('selectProfilePictureModal.introductionStep.controls.next')}</Typography>
        </NextStepButton>
      </IntroductionStepContainerInner>
    </IntroductionStepContainer>
  );
};

const SelectNftStep = ({ onNextStep = noop, onNftSelected = noop, onError = noop, nfts = {} }) => {
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedNftId, setSelectedNftId] = useState(null);
  const [selectedSlideId, setSelectedSlideId] = useState(-1);
  const [currentSlideId, setCurrentSlideId] = useState(0);

  const handleOnSelectSlide = useCallback((slideIndex, nftId) => {
    if (slideIndex === selectedSlideId) {
      setSelectedNftId(null);
      setSelectedSlideId(-1);
      return;
    }
    setSelectedSlideId(slideIndex);
    setSelectedNftId(nftId);
  }, [setSelectedSlideId, selectedSlideId]);

  const handleOnSubmitNft = useCallback(() => {
    if (!selectedNftId) {
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onNextStep();
    }, 1000);
    // TODO отправка на бекенд и loading
  }, [selectedNftId]);

  useEffect(() => {
    onNftSelected(selectedNftId);
  }, [selectedNftId]);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const isEmpty = !nfts?.ids?.length;

  return (
    <SelectNftStepContainer>
      <SelectNftStepContainerInner>
        {isEmpty && (
          <Typography variant="body1" color="text.primary">
            {t('selectProfilePictureModal.selectNftStep.errors.noAvailableNfts')}
          </Typography>
        )}

        {!isEmpty && (
          <>
            <SelectNftStepTitle>
              <Typography variant="h5" color="text.primary">{t('selectProfilePictureModal.selectNftStep.title')}</Typography>
            </SelectNftStepTitle>

            <SelectNftStepSlider>
              <SelectNftStepSliderCounter>
                <Typography variant="body1" color="text.primary" sx={{ fontWeight: 300 }}>
                  {t('selectProfilePictureModal.selectNftStep.outOf', {
                    current: currentSlideId + 1,
                    total: nfts?.ids?.length,
                  })}
                </Typography>
              </SelectNftStepSliderCounter>
              <Swiper
                modules={[Navigation, EffectFade]}
                spaceBetween={0}
                effect="fade"
                speed={0}
                slidesPerView={1}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                resistanceRatio={0.5}
                style={{ paddingLeft: '20px', paddingRight: '20px' }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                onSlideChange={(swiper) => {
                  setCurrentSlideId(swiper.activeIndex);
                }}
              >
                {nfts.ids.map((id, index) => (
                  <SwiperSlide key={id}
                    className={cn({ 'is-selected': (index === selectedSlideId) })}
                  >
                    <div className="image-wrapper">
                      <img src={nfts.entities[id]?.image?.src} alt={nfts.entities[id]?.image?.alt} title={nfts.entities[id]?.image?.title} onClick={() => handleOnSelectSlide(index, id)} />
                    </div>
                  </SwiperSlide>
                ))}
                <SliderNavigationArrowPrev ref={navigationPrevRef}>
                  <TrendingFlatIcon fontSize="large" />
                </SliderNavigationArrowPrev>
                <SliderNavigationArrowNext ref={navigationNextRef}>
                  <TrendingFlatIcon fontSize="large" />
                </SliderNavigationArrowNext>
              </Swiper>
            </SelectNftStepSlider>

            <NextStepButton onClick={handleOnSubmitNft} disabled={!selectedNftId} loading={isUploading}>
              {!isUploading && (
                <Typography variant="h5" component="span" color="text.primary">{t('selectProfilePictureModal.selectNftStep.controls.apply')}</Typography>
              )}
            </NextStepButton>
          </>
        )}
      </SelectNftStepContainerInner>
    </SelectNftStepContainer>
  );
};

const FinalStep = ({ onNextStep = noop, onError = noop, nft = IMAGE_MODEL }) => {
  const { t } = useTranslation();
  return (
    <FinalStepContainer>
      <Cover height="180px" />
      <FinalStepContainerInner>
        <FinalStepAvatar>
          <UserAvatar size="200px" src={nft?.src} />
        </FinalStepAvatar>
        <FinalStepDescription>
          <Stack gap={0.5}>
            <Typography variant="body1" color="text.primary" sx={{ display: 'flex', justifyContent: 'center' }}>
              {t('selectProfilePictureModal.finalStep.title')} &nbsp; <RocketLaunchIcon sx={{ fontSize: '1.3em' }} />
            </Typography>
            <Typography variant="body1" color="text.primary">
              {t('selectProfilePictureModal.finalStep.subtitle')}
            </Typography>
          </Stack>
        </FinalStepDescription>
        <NextStepButton onClick={onNextStep}>
          <Typography variant="h5" component="span" color="text.primary">{t('selectProfilePictureModal.finalStep.controls.done')}</Typography>
        </NextStepButton>
      </FinalStepContainerInner>
    </FinalStepContainer>
  );
};

export default SelectProfilePictureModal;

export {
  SelectProfilePictureForm,
  IntroductionStep,
  SelectNftStep,
  FinalStep,
};
