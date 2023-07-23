import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { useStarknetReact } from '@web3-starknet-react/core';

import { useEagerConnect, useInactiveListener } from '../../hooks';
import Page from '../../components/Page/Page';
import Header from '../../components/Header/Header';
import { MainLayoutContainer, MainLayoutHeaderContainer, MainLayoutBodyContainer, MainLayoutFooterContainer } from './MainLayout.styles';
import { NetworkContextName } from '../../common/contansts';

const MainLayout = ({ sidebarContent = null, bodyContent = null, disableSidebar = false }) => (
  <Page>
    <MainLayoutContainer>
      <MainLayoutHeaderContainer marginBottom={{ xs: 1, md: 2 }} px={{ xs: 2, md: 4 }}>
        <Header />
      </MainLayoutHeaderContainer>

      <MainLayoutBodyContainer marginBottom={{ xs: 1, md: 2 }} px={{ xs: 2, md: 4 }}>
        <Web3ReactManager>
          <Grid container rowSpacing={3} direction={{ xs: 'column', md: 'row' }}>
            {!disableSidebar && (
              <Grid item pr={{ md: 4 }} sx={{ width: { xs: '100%', md: '340px' } }}>
                {sidebarContent}
              </Grid>
            )}
            <Grid item xs sx={{ width: '100%' }}>
              {bodyContent}
            </Grid>
          </Grid>
        </Web3ReactManager>
      </MainLayoutBodyContainer>

      <MainLayoutFooterContainer px={{ xs: 2, md: 4 }} />
    </MainLayoutContainer>
  </Page>
);

const Web3ReactManager = ({ children }) => {
  const { active } = useStarknetReact();
  const { error: networkError } = useStarknetReact(NetworkContextName);

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager);

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (!active && networkError) {
    return (
      <div>Unknown error</div>
    );
  }

  return children;
};

export default MainLayout;
