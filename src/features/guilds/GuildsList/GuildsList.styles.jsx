import styled, { css } from 'styled-components';

import { gradientBorderMixin, widgetBoxMixin } from '../../../resources/styles/mixins';
import { guildStyling } from '../Guild/Guild.styles';

const GuildItemBoxContainer = styled.div`
  ${widgetBoxMixin};

  width: 170px;
  height: 135px;
  padding: 16px;

  .title {
    margin-bottom: 15px;
    font-weight: bold;
  }

  .subtitle {
    margin-bottom: 10px;
  }

  .contribution-link {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    text-align: left;

    svg {
      font-size: 1.2rem;
      margin-left: 10px;
    }
  }

  ${(props) => props.active && css`
      background: ${guildStyling[props.guildTheme] || guildStyling.all};
      box-shadow: none;
  `};

  ${(props) => props.selected && css`
      ${gradientBorderMixin({ gradient: guildStyling[props.guildTheme] || guildStyling.all })}
      overflow: visible;

      &:before {
          width: calc(100% + 16px);
          height: calc(100% + 16px);
          transform: translate(-10px, -10px);
        }
  `};
`;

export {
  GuildItemBoxContainer,
};
