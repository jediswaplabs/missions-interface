import styled from 'styled-components';

const MintBox = styled.div`
  border-radius: 8px;
  border: 1px solid rgba(160, 160, 160, 0.40);
  background: rgba(255, 255, 255, 0.05);
  // width: 700px;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  margin-top: 20px;
`;

const MintCardStatus = styled.div`
  width: '314px';
  height: 56px;
  color: #9B9B9B;
  display: flex;
  justify-content: center;
  align-items: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Avenir LT Std, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 750;
  line-height: 20px; /* 100% */
  border-radius: 8px;
  background: var(--jedi-navy-blue, #141451);
  box-shadow: 0px 0.7697721123695374px 30.790884017944336px 0px rgba(227, 222, 255, 0.20) inset, 0px 3.0790884494781494px 13.8558988571167px 0px rgba(154, 146, 210, 0.30) inset, 0px 75.43766784667969px 76.97720336914062px -36.949066162109375px rgba(202, 172, 255, 0.30) inset;
`;

const MintCardClaimed = styled.div`
  color: var(--jedi-white, #FFF);
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Avenir LT Std, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 750;
  line-height: 20px; /* 100% */
  border-radius: 8px;
  border: 1px solid rgba(160, 160, 160, 0.40);
  background: rgba(255, 255, 255, 0.05);
  width: 314px;
  height: 58px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export {
  MintCardStatus,
  MintCardClaimed,
  MintBox
}