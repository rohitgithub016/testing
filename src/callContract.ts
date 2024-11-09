import { beginCell } from "ton";
import claim from "./claim";
import { Address, Cell } from "ton";

const callContract = async (tonConnectUI) => {
  // Assuming claim returns proof1
  const { proof1 } = claim();

  const queryId = 0; // Replace with the actual query ID
  const proof = proof1; // Replace with the actual proof

  // Clone proof for transaction
  const clonedProof = Cell.fromBoc(proof.toBoc())[0];

  // Create the payload for the contract call
  const payloadCell = beginCell()
    .storeUint(queryId, 64)
    .storeRef(clonedProof)
    .endCell();

  const payloadBase64 = payloadCell.toBoc().toString('base64');

  // Define the transaction object as per documentation format
  const transaction = {
    validUntil: Date.now() + 5 * 60 * 1000, // Valid for 5 minutes
    messages: [
      {
        address: 'EQBsjE4yiAFs7l8E6CPk2ngc5D4NHUkmD4-fzdsQnwVrpaSO', // Claim contract address
        amount: '10000000', // 10 TON in nanotons
        payload: payloadBase64, // Add the payload here
      },
    ],
  };

  // Sending the transaction through TonConnectUI
  try {
    const result = await tonConnectUI.sendTransaction(transaction);
    console.log("Transaction result:", result);
  } catch (err) {
    console.log("Error sending transaction:", err);
  }
};

export default callContract;
