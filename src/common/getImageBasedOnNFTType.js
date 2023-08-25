import nft1 from '../resources/images/L1P1-min.png';
import nft2 from '../resources/images/L1P2-min.png';
import nft3 from '../resources/images/L1P3.png';
import nft4 from '../resources/images/L1P4.png';
import nft5 from '../resources/images/L1P5.png';
import nftw from '../resources/images/L1PW.png';

const nfts = {
  nft1: 'L1P1',
  nft2: 'L1P2',
  nft3: 'L1P3',
  nft4: 'L1P4',
  nft5: 'L1P5',
  nft6: 'L1PW',
};

export const imageBasedOnNFTType = (nftTypeReceived) => {
  if (nftTypeReceived === nfts.nft1) {
    return nft1;
  }
  if (nftTypeReceived === nfts.nft2) {
    return nft2;
  }
  if (nftTypeReceived === nfts.nft3) {
    return nft3;
  }
  if (nftTypeReceived === nfts.nft4) {
    return nft4;
  }
  if (nftTypeReceived === nfts.nft5) {
    return nft5;
  }
  if (nftTypeReceived === nfts.nft6) {
    return nftw;
  }
};
