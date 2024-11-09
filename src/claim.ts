import { Cell, Dictionary } from '@ton/core';
// import { NetworkProvider, compile } from '@ton/blueprint';

const airdropEntryValue = {
    serialize: (src, builder) => {
        builder.storeAddress(src.address).storeCoins(src.amount);
    },
    parse: (src) => ({
        address: src.loadAddress(),
        amount: src.loadCoins(),
    }),
}

const claim = () => {
    const dictCell = Cell.fromBase64(
        'te6cckEBAQEAKQAATdAIAeFTl/d5yJaKz5IfTiWHAdTKq+wsj3767ftFKY7vZA26cxLQEJUPvok='
    );
    const dict = dictCell.beginParse().loadDictDirect(Dictionary.Keys.BigUint(256), airdropEntryValue);

    const entryIndex = 0n;

    const proof = dict.generateMerkleProof([entryIndex]);

    // const helper = provider.open(
    //     AirdropHelper.createFromConfig(
    //         {
    //             airdrop: Address.parse('EQB-2zuB54yNpzwl29HGmwUfMsDYa-n0Dkkc4PlgMww1GdPP'),
    //             index: entryIndex,
    //             proofHash: proof.hash(),
    //         },
    //         await compile('AirdropHelper')
    //     )
    // );
    return {proof: proof?.hash(), entryIndex, proof1: proof}

}

export default claim