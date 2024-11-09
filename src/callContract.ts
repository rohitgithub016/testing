import { beginCell } from "ton";
import claim from "./claim";
import { Address, Cell } from "ton";
import { makeGetCall } from "./makeGetCall";
import { getClient } from "./getClient";

const callContract = async(tonConnectUI) => {

  // const tc = await getClient();
    const { proof1 } = claim("EQA0nI_V6YmS3D2p5xmX-ncWJofF5xjysnNYGX-dqKASFpZp");
  // console.log(proof1)

  // const ownerJWalletAddr = await makeGetCall(
  //   Address.parse("EQBsjE4yiAFs7l8E6CPk2ngc5D4NHUkmD4-fzdsQnwVrpaSO"),
  //   "sendClaim",
  //   [beginCell().storeUint(0, 64).storeRef(proof1).endCell()],
  //   ([addr]) => (addr as Cell).beginParse().readAddress()!,
  //   tc
  // );
  // console.log(ownerJWalletAddr)

      const queryId = 0n ; //replace
      const proof = proof1 ; //replace

      const payloadCell = beginCell()
        .storeUint(0, 64)
        .storeRef(proof)
        .endCell();

      const payloadBase64 = payloadCell.toBoc().toString('base64');

      const transaction = {
        to: 'EQA0nI_V6YmS3D2p5xmX-ncWJofF5xjysnNYGX-dqKASFpZp', //claim contract address 
        value: '1000000000',
        payload: payloadBase64,
      };

      const result = await tonConnectUI.sendTransaction(transaction);

      console.log(result);
};

export default callContract
