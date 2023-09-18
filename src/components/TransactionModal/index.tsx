import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Text } from "rebass";
import { AlertTriangle, ArrowUp } from "react-feather";

import Modal from "../Modal";
import { ExternalLink } from "../../theme/components";
import { CustomLightSpinner } from "../../theme/components";
import CloseIcon from "@mui/icons-material/Close";
import { RowBetween } from "../Row";
import { ButtonGradient, ButtonPrimary } from "../Button";
import { AutoColumn, ColumnCenter } from "../Column";
import Circle from "../../resources/icons/loadingCircle.svg";
import openInBrowser from "../../resources/icons/openInBrowser.svg";
import { useAccountDetails } from "../../hooks";
import { getStarkscanLink } from "../../common/explorerHelper";
import { SvgIcon } from "@mui/material";

const Wrapper = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.jediWhite};
  font-family: "DM Sans", sans-serif;
`;
const Section = styled(AutoColumn)`
  padding: 16px 32px;
  background-color: ${({ theme }) => theme.jediNavyBlue};
  border-radius: ${({ withBorderBottom }) =>
    withBorderBottom ? "8px" : "8px 8px 0 0"};
`;

const BottomSection = styled(Section)`
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 0px 0 40px;
`;
const TextWrapper = styled.div`
  margin-top: 18px;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;
function ConfirmationPendingContent({ onDismiss, pendingText }) {
  return (
    <Wrapper>
      <Section style={{ padding: "35px 32px 32px" }} withBorderBottom>
        <ConfirmedIcon>
          <CustomLightSpinner>
            <SvgIcon
              component={Circle}
              inheritViewBox
              style={{ width: "unset", height: "240px" }}
            />
          </CustomLightSpinner>
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify="center">
          <Text
            fontWeight={700}
            fontSize={24}
            fontFamily="DM Sans"
            color="#F2F2F2"
            letterSpacing="0px"
          >
            Waiting For Confirmation
          </Text>
          <AutoColumn gap="12px" justify="center">
            <Text
              fontWeight={400}
              fontSize={16}
              color="#F2F2F2"
              textAlign="center"
              fontFamily="DM Sans"
              letterSpacing="0px"
            >
              {pendingText}
            </Text>
          </AutoColumn>
          <Text
            fontSize={16}
            fontWeight={400}
            color="#F2F2F2"
            textAlign="center"
            fontFamily="DM Sans"
            letterSpacing="0px"
            marginTop="50px"
          >
            Confirm this transaction in your wallet
          </Text>
        </AutoColumn>
      </Section>
    </Wrapper>
  );
}

function TransactionSubmittedContent({ onDismiss, chainId, hash }) {
  return (
    <Wrapper>
      <Section style={{ padding: "18px" }} withBorderBottom>
        <RowBetween>
          <div />
          <CloseIcon onClick={onDismiss} style={{ color: "#fff" }} />
        </RowBetween>
        <ConfirmedIcon>
          <ArrowUp strokeWidth={1} size={90} color={"#fff"} />
        </ConfirmedIcon>
        <AutoColumn gap="12px" justify="center">
          <Text
            fontWeight={700}
            fontSize={24}
            fontFamily="DM Sans"
            color="#FFFFFF"
            letterSpacing="0px"
          >
            Transaction Submitted
          </Text>

          {chainId && hash && (
            <ExternalLink href={getStarkscanLink(chainId, hash, "transaction")}>
              <Row>
                <SvgIcon
                  component={openInBrowser}
                  inheritViewBox
                  style={{ width: "unset"}}
                />{" "}
                <Text
                  fontWeight={500}
                  fontSize={14}
                  color={"#fff"}
                  fontFamily="DM Sans"
                  letterSpacing="0px"
                >
                  Open in browser
                </Text>
              </Row>
            </ExternalLink>
          )}
          <ButtonGradient onClick={onDismiss} style={{ margin: "20px 0 0 0" }}>
            <Text>Close</Text>
          </ButtonGradient>
        </AutoColumn>
      </Section>
    </Wrapper>
  );
}

export function TransactionErrorContent({ message, onDismiss }) {
  return (
    <Wrapper>
      <Section>
        <RowBetween>
          <div />
          <CloseIcon onClick={onDismiss} style={{ color: "#fff" }} />
        </RowBetween>
        <AutoColumn
          style={{ marginTop: 20, padding: "2rem 0" }}
          gap="24px"
          justify="center"
        >
          <AlertTriangle
            color={"#FF3257"}
            style={{ strokeWidth: 1.5 }}
            size={64}
          />
          <Text
            fontWeight={700}
            fontSize={24}
            color={"#fff"}
            fontFamily={"DM Sans"}
            style={{ textAlign: "center", width: "85%" }}
          >
            {message}
          </Text>
        </AutoColumn>
      </Section>
      <BottomSection gap="12px">
        <ButtonPrimary onClick={onDismiss}>Dismiss</ButtonPrimary>
      </BottomSection>
    </Wrapper>
  );
}

export default function TransactionConfirmationModal({
  isOpen,
  onDismiss,
  attemptingTxn,
  hash,
  pendingText,
  error,
  message,
}) {
  const { account, chainId } = useAccountDetails();

  if (!chainId) {
    return null;
  }

  // confirmation screen
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={90}>
      {attemptingTxn && !error && !hash ? (
        <ConfirmationPendingContent
          onDismiss={onDismiss}
          pendingText={pendingText}
        />
      ) : error && !hash ? (
        <TransactionErrorContent message={message} onDismiss={onDismiss} />
      ) : (
        <TransactionSubmittedContent
          onDismiss={onDismiss}
          hash={hash}
          chainId={chainId}
        />
      )}
    </Modal>
  );
}
