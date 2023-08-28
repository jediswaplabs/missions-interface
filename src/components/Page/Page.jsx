import React from 'react';

import { PageContainer, PageInnerContainer } from './Page.styles';

const Page = (props) => (
  <PageContainer>
    <PageInnerContainer>{props.children}</PageInnerContainer>
  </PageContainer>
);

export default Page;
