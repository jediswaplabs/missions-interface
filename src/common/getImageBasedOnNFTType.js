import nft1 from '../resources/images/L1P1-min.png';
import nft2 from '../resources/images/L1P2-min.png';
import nft3 from '../resources/images/L1P3-min.png';
import nft4 from '../resources/images/L1P4-min.png';
import nft5 from '../resources/images/L1P5-min.png';
import nftw from '../resources/images/L1PW-min.png';

const nfts = {
  nft1: 'L1P1',
  nft2: 'L1P2',
  nft3: 'L1P3',
  nft4: 'L1P4',
  nft5: 'L1P5',
  nft6: 'L1PW',
};

export const imageBasedOnNFTType = (nftTypeReceived) => {
  switch (nftTypeReceived) {
    case nfts.nft1:
      return nft1;
    case nfts.nft2:
      return nft2;
    case nfts.nft3:
      return nft3;
    case nfts.nft4:
      return nft4;
    case nfts.nft5:
      return nft5;
    case nfts.nft6:
      return nftw;
    default:
      return nft1;
  }
};
