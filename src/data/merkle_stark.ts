import { merkle, num,cairo } from 'starknet';
import * as starkCurve from 'micro-starknet';

// array of  [address, token_id, task_id, name, rank, score, percentile, level, total_eligible_users]
let list = [['0x0138EfE7c064c69140e715f58d1e29FC75E5594D342E568246a4D6a3131a5974', 1, 1, 'L1P1', 10, 12000, 1, 6, 120000],
['0x0161A9bCA8dCc5975A03b12f5F7bF9610e1541635eb40eB3A89bAeeDC168e636', 2, 1, 'L1P2', 20, 11000, 2, 6, 120000],
['0x0138EfE7c064c69140e715f58d1e29FC75E5594D342E568246a4D6a3131a5974', 3, 1, 'L1P1', 320, 10000, 3, 6, 120000],
['0x2b9ce3e6869192006820c2b41c084bab97f17dae966b981dca2fdae1c178065', 4, 1, 'L1P1', 420, 9000, 4, 6, 120000],
['0x0138EfE7c064c69140e715f58d1e29FC75E5594D342E568246a4D6a3131a597a', 5, 1, 'L1P1', 520, 8000, 5, 6, 120000],
['0x0138EfE7c064c69140e715f58d1e29FC75E5594D342E568246a4D6a3131a597E', 6, 1, 'L1P1', 620, 7000, 6, 6, 120000],
];


// convert to aim list, each item is hash of two elements
let aimList = list.map(item => {
    let tmp =  starkCurve.pedersen(BigInt(item[0]),  BigInt(item[1]))
    tmp = starkCurve.pedersen(BigInt(tmp),  BigInt(item[2]))
    tmp = starkCurve.pedersen(BigInt(tmp),  num.toHex(cairo.felt(item[3])))
    tmp = starkCurve.pedersen(BigInt(tmp),  BigInt(item[4]))
    tmp = starkCurve.pedersen(BigInt(tmp),  BigInt(item[5]))
    tmp = starkCurve.pedersen(BigInt(tmp),  BigInt(item[6]))
    tmp = starkCurve.pedersen(BigInt(tmp),  BigInt(item[7]))
    tmp = starkCurve.pedersen(BigInt(tmp),  BigInt(item[8]))

    return tmp;
})
export const tree = new merkle.MerkleTree(aimList);

console.log(tree.root);

console.log(tree.getProof(aimList[0]))

// console.log(merkle.proofMerklePath(tree.root, '1', tree.getProof('1')))