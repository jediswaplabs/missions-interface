import React, { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Tab } from '@mui/material';
import Grid from '@mui/material/Grid';

import MainLayout from '../../layouts/MainLayout/MainLayout';

const ProfilePage = () => {
    const bodyContent = (<h1>profile page</h1>);
    return <MainLayout bodyContent={bodyContent} disableSidebar />
};

export default ProfilePage;