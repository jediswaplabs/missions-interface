import React from 'react';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';

import * as stories from './Leaderboard.stories';

const { Default } = composeStories(stories);

describe('Components/Foo', () => {
  it('Should render Foo with Bar', async () => {
    const { container } = render(<Default />);
    await Default.play({ canvasElement: container });
  });
});
