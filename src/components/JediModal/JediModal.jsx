import React from 'react';
import MaterialModal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { ModalContainer } from './JediModal.styles';

const defaultBoxStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  backgroundColor: '#141451',
  padding: '1rem',
  border: '1px solid #fff',
  borderRadius: '8px',
  overflow: 'hidden',
};

const JediModal = ({ children, fullWidth, contentSx = [], ...props }) => (
  <ModalContainer>
    <MaterialModal {...props}>
      <Box sx={[
        defaultBoxStyles,
        ...(fullWidth ? [{ width: '100%' }] : []),
        ...(Array.isArray(contentSx) ? contentSx : [contentSx]),
      ]}
      >
        {children}
      </Box>
    </MaterialModal>
  </ModalContainer>
);

export default JediModal;
