import styled from 'styled-components';

import { widgetBoxMixin } from '../../../resources/styles/mixins';

const ActivitiesBoxContainer = styled.div`
  ${widgetBoxMixin};
`;

const ActivitiesBoxHeader = styled.div``;

const ActivitiesBoxItems = styled.div`
  margin: 16px 0;
  padding: 0 32px;
  display: inline-block;
  width: 100%;

  li.MuiListItem-root {
    margin-bottom: 14px;
  }

  li.MuiListItem-root:last-child {
    margin-bottom: 0;
  }
`;

export {
  ActivitiesBoxContainer,
  ActivitiesBoxHeader,
  ActivitiesBoxItems,
};
