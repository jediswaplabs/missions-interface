import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

// TODO create a lookup for languages and add it to constanst.js
const locales = [
  { name: 'English', code: 'en' },
  { name: 'हिंदी', code: 'hi' },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState(i18n.language);

  const handleChangeLocale = (e) => {
    const lang = e.target.value;
    setLocale(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('locale', lang);
  };

  return (
    <Select
      value={locale}
      onChange={handleChangeLocale}
      sx={{ marginRight: '2rem' }}
      inputProps={{
        MenuProps: {
          MenuListProps: {
            sx: {
              backgroundColor: '#200732',
            },
          },
        },
      }}
    >
      {locales.map(({ name, code }) => (
        <MenuItem key={code} value={code}>
          {name}
        </MenuItem>
      ))}
    </Select>
  );
};
export default LanguageSwitcher;
