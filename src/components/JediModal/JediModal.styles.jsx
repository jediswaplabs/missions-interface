import styled from 'styled-components';
import Box from '@mui/material/Box';

import { gradientBorderMixin, widgetBoxMixin } from '../../resources/styles/mixins';

const ModalContainer = styled.div`
  ${widgetBoxMixin({ borderRadius: '16px' })}
  ${gradientBorderMixin({ borderRadius: '16px' })}
`;

export {
  ModalContainer,
};
