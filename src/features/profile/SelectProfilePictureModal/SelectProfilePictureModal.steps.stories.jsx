import React from 'react';
import { expect } from '@storybook/jest';
import { fireEvent, userEvent, waitFor, within } from '@storybook/testing-library';

import SelectProfilePictureModal, { IntroductionStep as IntroductionStepComponent, SelectNftStep as SelectNftStepComponent, FinalStep as FinalStepComponent } from './SelectProfilePictureModal';
import { renderWithProviders } from '../../../common/testsHelper';
import { sleep } from '../../../common/sleepHelper';
import { defaultNftListItems } from '../../nft/NftCarousel/NftCarousel.testData';
import { DEFAULT_IMAGE } from '../../nft/NftCard/NftCard';
import { selectProfilePictureModal as selectProfilePictureModalNames } from '../../../../public/locales/en/translation.json';

const TemplateWithComponent = (Component) => (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div style={{ width: '650px', height: '425px' }}>
      <Component {...args} />
    </div>
  </>
);

const IntroductionStep = TemplateWithComponent.bind({})(IntroductionStepComponent);
IntroductionStep.args = {
  storyTitle: 'Steps/IntroductionStep',
};
IntroductionStep.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: {} } });
    return <MockStore><Story /></MockStore>;
  },
];
IntroductionStep.parameters = {};
IntroductionStep.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  const btn = await canvas.findByText(selectProfilePictureModalNames.introductionStep.controls.next);
  await userEvent.click(btn);
  expect(args.onNextStep).toHaveBeenCalled();
};

const SelectNftStep = TemplateWithComponent.bind({})(SelectNftStepComponent);
SelectNftStep.args = {
  storyTitle: 'Steps/SelectNftStep',
  nfts: defaultNftListItems,
};
SelectNftStep.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: {} } });
    return <MockStore><Story /></MockStore>;
  },
];
SelectNftStep.parameters = {};
SelectNftStep.play = async ({ canvasElement, args, step }) => {
  const canvas = within(canvasElement);
  const imgs = await canvas.findAllByRole('img');
  await step('Select NFT and click the button', async () => {
    const btn = await canvas.findByRole('button');
    expect(btn).toBeDisabled();
    const [arrowLeft, arrowRight] = await canvas.findAllByTestId('TrendingFlatIcon');
    await userEvent.click(arrowRight);
    fireEvent(imgs[1], new window.MouseEvent('click', { bubbles: true }));
    await waitFor(() => expect(canvas.getByRole('button')).toBeEnabled());
    await userEvent.click(btn);
    await sleep(1500); // we need this because of the setTimeout 1000 in the callback
    expect(args.onNextStep).toHaveBeenCalled();
  });
  await step('Deselecting NFT disables the button', async () => {
    fireEvent(imgs[1], new window.MouseEvent('click', { bubbles: true }));
    await waitFor(() => expect(canvas.getByRole('button')).toBeDisabled());
  });
};
//
const FinalStep = TemplateWithComponent.bind({})(FinalStepComponent);
FinalStep.args = {
  storyTitle: 'Steps/FinalStep',
  nft: DEFAULT_IMAGE,
};
FinalStep.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: {} } });
    return <MockStore><Story /></MockStore>;
  },
];
FinalStep.parameters = {};
FinalStep.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  const btn = await canvas.findByText(selectProfilePictureModalNames.finalStep.controls.done);
  await userEvent.click(btn);
  expect(args.onNextStep).toHaveBeenCalled();
};

const stories = {
  title: 'Components/SelectProfilePictureModal/Steps',
  component: SelectProfilePictureModal,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    onNextStep: { action: true },
  },
};

export {
  IntroductionStep,
  SelectNftStep,
  FinalStep,
};

export default stories;
