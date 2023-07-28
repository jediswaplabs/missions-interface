import styled from 'styled-components';
import Box from '@mui/material/Box';

const QuestBox = styled(Box)`
    border-radius: 8px;
    border: 1px solid rgba(160, 160, 160, 0.40);
    background: rgba(255, 255, 255, 0.05);
    // max-width: 1090px;
    // height: 321px;
    display: flex;
    // flex-direction: column;
    // justify-content: space-between;
    padding-left: 30px;
    padding-bottom: 30px;
    // margin: 30px;
`;

const QuestCardCalend = styled.div`
    display: flex;
    margin-bottom: 30px;
`;

const QuestCardType = styled.p`

`;

const QuestCardTitle = styled.p`

`;

const QuestCardDescription = styled.p`
    max-width: 480px;
`;

const QuestCardBtn = styled.button`

`;

export {
    QuestBox,
    QuestCardType,
    QuestCardTitle,
    QuestCardDescription,
    QuestCardBtn,
    QuestCardCalend
};