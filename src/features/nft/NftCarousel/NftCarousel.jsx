/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import Typography from '@mui/material/Typography';
import { FreeMode } from 'swiper';

import 'swiper/css';
import 'swiper/css/bundle';

import { NftCarouselContainer, NftCarouselHeader, NftCarouselContent } from './NftCarousel.styles';
import NftCard from '../NftCard/NftCard';
import { useLazyGetMeshNftByUserIdQuery } from '../../api/apiSlice';

const NftCarousel = ({ account }) => {
  const { t } = useTranslation();

  const [getMeshNftByUserId, {
    data: nfts = {},
    isFetching,
    isSuccess,
    isError,
    isUninitialized,
  }] = useLazyGetMeshNftByUserIdQuery();

  useEffect(() => {
    if (!account) { return; }
    getMeshNftByUserId(account);
  }, [account]);

  const isEmpty = !nfts?.ids?.length;

  let content;
  if (isError || !account) {
    content = <ErrorNftCarousel />;
  } else if (isFetching || isUninitialized) {
    content = <MockNftCarousel />;
  } else if (isEmpty) {
    content = <EmptyNftCarousel />;
  } else if (isSuccess) {
    content = (
      <Swiper modules={[FreeMode]} spaceBetween={20} slidesPerView="auto" resistance resistanceRatio={0}>
        {nfts.ids.map((id) => (
          <SwiperSlide key={id}>
            <NftCard {...nfts.entities[id]} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <NftCarouselContainer>
      <NftCarouselHeader>
        <Typography variant="h6" color="text.primary">{t('meshNftsCarousel.title')}</Typography>
      </NftCarouselHeader>
      <NftCarouselContent>
        <Swiper modules={[FreeMode]} spaceBetween={20} slidesPerView="auto" resistance resistanceRatio={0}>
          {content}
        </Swiper>
      </NftCarouselContent>
    </NftCarouselContainer>
  );
};

const MockNftCarousel = () => {
  const data = Array(12).fill();
  return (
    <Swiper enabled={false} spaceBetween={20} slidesPerView="auto" data-testid="loading_carousel">
      {data.map((_, key) => (
        <SwiperSlide key={key}>
          <NftCard isLoading />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const ErrorNftCarousel = () => {
  const { t } = useTranslation();
  return (
    <Typography variant="body1" color="text.primary" data-testid="error_carousel">{t('meshNftsCarousel.errors.fetching')}</Typography>
  );
};
const EmptyNftCarousel = () => {
  const { t } = useTranslation();
  return (
    <Typography variant="body1" color="text.primary" data-testid="empty_carousel">{t('meshNftsCarousel.errors.empty')}</Typography>
  );
};

NftCarousel.propTypes = {
  account: PropTypes.string,
};

export default NftCarousel;
