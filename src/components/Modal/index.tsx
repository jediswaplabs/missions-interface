import React from 'react'
import styled, { css } from 'styled-components'
import { animated, useTransition, useSpring } from 'react-spring'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { isMobile } from 'react-device-detect'
import '@reach/dialog/styles.css'
import { transparentize } from 'polished'
import { useGesture } from 'react-use-gesture'

const AnimatedDialogOverlay = animated(DialogOverlay)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    z-index: 2;
    background-color: transparent;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${({ theme }) => theme.modalBG};
  }
`

const AnimatedDialogContent = animated(DialogContent)
// destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogContent = styled(({ minHeight, maxHeight, mobile, isOpen, ...rest }) => (
  <AnimatedDialogContent {...rest} />
)).attrs({
  'aria-label': 'dialog'
})`
  overflow-y: ${({ mobile }) => (mobile ? 'scroll' : 'hidden')};

  &[data-reach-dialog-content] {
    margin: 0 0 0 0;
    background-color: #141451;
    // box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.95, theme.shadow1)};
    padding: 0px;
    width: 50vw;
    overflow-y: ${({ mobile }) => (mobile ? 'scroll' : 'hidden')};
    overflow-x: hidden;

    align-self: ${({ mobile }) => (mobile ? 'flex-end' : 'center')};

    max-width: 420px;
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: 8px;
    // ${({ theme }) => theme.mediaWidth.upToMedium`
    //   width: 65vw;
    //   margin: 0;
    // `}
   
  }
`
const BorderWrapper = styled.div`
  background: linear-gradient(to top right, #50d5ff, #ef35ff);
  padding: 2px;
  border-radius: 8px;
`
export default function Modal({
  isOpen,
  onDismiss,
  minHeight = false,
  maxHeight = 90,
  initialFocusRef,
  children
}) {
  const fadeTransition = useTransition(isOpen, null, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  const [{ y }, set] = useSpring(() => ({ y: 0, config: { mass: 1, tension: 210, friction: 20 } }))
  const bind = useGesture({
    onDrag: state => {
      set({
        y: state.down ? state.movement[1] : 0
      })
      if (state.movement[1] > 300 || (state.velocity > 3 && state.direction[1] > 0)) {
        onDismiss()
      }
    }
  })

  return (
    <>
      {fadeTransition.map(
        ({ item, key, props }) =>
          item && (
            <StyledDialogOverlay
              dangerouslyBypassScrollLock={true}
              key={key}
              style={props}
              onDismiss={onDismiss}
              initialFocusRef={initialFocusRef}
            >
              <BorderWrapper>
                <StyledDialogContent
                  {...(isMobile
                    ? {
                        ...bind(),
                        style: {
                          transform: y.interpolate(y => typeof y === 'number' && `translateY(${y > 0 ? y : 0}px)`)
                        }
                      }
                    : {})}
                  aria-label="dialog content"
                  minHeight={minHeight}
                  maxHeight={maxHeight}
                  mobile={isMobile}
                >
                  {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                  {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                  {children}
                </StyledDialogContent>
              </BorderWrapper>
            </StyledDialogOverlay>
          )
      )}
    </>
  )
}
