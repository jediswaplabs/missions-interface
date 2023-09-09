import React, { useCallback } from 'react'
import styled, { keyframes } from 'styled-components'



const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

/**
 * Outbound link that handles firing google analytics events
 */
export function ExternalLink({
  target = "_blank",
  href,
  rel = "noopener noreferrer",
  ...rest
}) {
  const handleClick = useCallback(
    (event) => {
      // don't prevent default, don't redirect if it's a new tab
      if (target === "_blank" || event.ctrlKey || event.metaKey) {
        console.debug("Fired outbound link event", href);
      } else {
        event.preventDefault();
        // trigger a location change
        window.location.href = href;
      }
    },
    [href, target]
  );
  return (
    <StyledLink
      target={target}
      rel={rel}
      href={href}
      onClick={handleClick}
      {...rest}
    />
  );
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.svg`
  animation: 2s ${rotate} linear infinite;
  width: 16px;
  height: 16px;
`

export const CustomLightSpinner = styled(Spinner)`
  width: 80px;
  height: 80px;
  color: ${({ theme }) => theme.jediBlue};
`
