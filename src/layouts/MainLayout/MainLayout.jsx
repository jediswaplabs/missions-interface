import React from 'react';

import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import { MainLayoutContainer, MainLayoutHeaderContainer, MainLayoutBodyContainer, MainLayoutFooterContainer, HeaderLine } from './MainLayout.styles';
// import { NetworkContextName } from '../../common/contansts';

const MainLayout = ({ sidebarContent = null, bodyContent = null, disableSidebar = false }) => (
  <Page>
    <HeaderLine />
    <MainLayoutContainer>
      <MainLayoutHeaderContainer marginBottom={{ xs: 1, md: 2 }} px={{ xs: 2, md: 4 }}>
        <Header />
      </MainLayoutHeaderContainer>

      <MainLayoutBodyContainer marginBottom={{ xs: 1, md: 2 }} px={{ xs: 2, md: 4 }} position="relative">
        {bodyContent}
      </MainLayoutBodyContainer>

      <MainLayoutFooterContainer px={{ xs: 2, md: 4 }} />
    </MainLayoutContainer>
  </Page>
);

export default MainLayout;
