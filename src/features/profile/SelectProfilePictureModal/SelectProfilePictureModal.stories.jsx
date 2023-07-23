import React from 'react';
import { graphql } from 'msw';
import { fireEvent, userEvent, within } from '@storybook/testing-library';

import SelectProfilePictureModal, { SelectProfilePictureForm as SelectProfilePictureFormComponent } from './SelectProfilePictureModal';
import { renderWithProviders } from '../../../common/testsHelper';
import { zeroAddress } from '../../../common/contansts';
import { defaultNftListItems } from '../../nft/NftCarousel/NftCarousel.testData';
import { selectProfilePictureModal as selectProfilePictureModalNames } from '../../../../public/locales/en/translation.json';

const ARTIFICIAL_DELAY_MS = 600;
const TemplateWithComponent = (Component) => (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div style={{ width: '650px', height: '425px' }}>
      <Component {...args} />
    </div>
  </>
);

const Form = TemplateWithComponent.bind({})(SelectProfilePictureFormComponent);
Form.args = {
  storyTitle: 'SelectProfilePictureForm',
  account: zeroAddress,
};
Form.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: {} } });
    return <MockStore><Story /></MockStore>;
  },
];
Form.parameters = {
  msw: {
    handlers: [
      graphql.query('GetMeshNftByUserId', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultNftListItems),
      )),
    ],
  },
};
Form.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const btnSelect = await canvas.findByText(selectProfilePictureModalNames.introductionStep.controls.next);
  await userEvent.click(btnSelect);
  const imgs = await canvas.findAllByRole('img');
  fireEvent(imgs[0], new window.MouseEvent('click', { bubbles: true }));
  const btnApply = await canvas.findByText(selectProfilePictureModalNames.selectNftStep.controls.apply);
  await userEvent.click(btnApply);
  await canvas.findByText(selectProfilePictureModalNames.finalStep.controls.done);
};

const LoadingForm = TemplateWithComponent.bind({})(SelectProfilePictureFormComponent);
LoadingForm.args = {
  storyTitle: 'LoadingSelectProfilePictureForm',
  account: zeroAddress,
};
LoadingForm.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: {} } });
    return <MockStore><Story /></MockStore>;
  },
];
LoadingForm.parameters = {
  msw: {
    handlers: [
      graphql.query('GetMeshNftByUserId', (req, res, ctx) => res(
        ctx.delay('infinite'),
      )),
    ],
  },
};
LoadingForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByTestId('loading_profile_picture_form');
};

const ErrorForm = TemplateWithComponent.bind({})(SelectProfilePictureFormComponent);
ErrorForm.args = {
  storyTitle: 'ErrorSelectProfilePictureForm',
  account: zeroAddress,
};
ErrorForm.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: {} } });
    return <MockStore><Story /></MockStore>;
  },
];
ErrorForm.parameters = {
  msw: {
    handlers: [
      graphql.query('GetMeshNftByUserId', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.errors([
          { message: 'Failed to get data' },
        ]),
      )),
    ],
  },
};
ErrorForm.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByTestId('error_profile_picture_form');
};

const stories = {
  title: 'Components/SelectProfilePictureModal',
  component: SelectProfilePictureModal,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  Form,
  LoadingForm,
  ErrorForm,
};

export default stories;
