import React from 'react';
// import { useStarknetReact } from '@web3-starknet-react/core';

// import { useEagerConnect, useInactiveListener } from '../../hooks/index.ts';
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
        {/* <Web3ReactManager> */}
        {bodyContent}
        {/* </Web3ReactManager> */}
      </MainLayoutBodyContainer>

      <MainLayoutFooterContainer px={{ xs: 2, md: 4 }} />
    </MainLayoutContainer>
  </Page>
);

// const Web3ReactManager = ({ children }) => {
//   const { active } = useStarknetReact();
//   const { error: networkError } = useStarknetReact(NetworkContextName);

//    try to eagerly connect to an injected provider, if it exists and has granted access already
//   const triedEager = useEagerConnect();

//    when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
//   useInactiveListener(!triedEager);

//    if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
//   if (!active && networkError) {
//     return (
//       <div>Unknown error</div>
//     );
//   }

//   return children;
// };

export default MainLayout;
