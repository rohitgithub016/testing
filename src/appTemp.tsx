import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { CHAIN } from '@tonconnect/protocol';
import "./style.css";
import { Address, beginCell, toNano, Cell, StateInit } from "ton";
import BN from "bn.js";
import { useState } from "react";

// Specify gas required for deployment
export const DEPLOY_GAS = toNano("0.1");

export default function App() {
  const [ad, setAd] = useState("");
  const walletAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  async function deployContract() {
    try {
      const ownerAddress = Address.parse(walletAddress);

      // Data from backend (including contract and helper hex codes)
      const data = {
        airdropContractAddress: 'EQAJwHyLqmRXMOHxmvKVUuDdNyvJ7ykxKCCRspSGuYiyqQmL',
        dictCellBase64: 'te6cckEBAQEAKgAAT9AIAKgfVaKEoRubk9A4zPefVG54jrtSl7fQ9njAO8ULsU4SjuaygBBi5I1J',
        merkleRoot: 92809725053853176027830988708193645447941139483491440242080957149474509985528n,
        jettonWallet: 'EQDXH7cdc17Lnz8VxU5pfHNpsyb68lLkd7iHw8kWc5V0sq8I',
        helperCodeHex: 'b5ee9c7241010701008a000114ff00f4a413f4bcf2c80b01020120040201bef26c2101821005f5e100bef2e2c0ed44d0d20001f2d2be88ed54fa40d3ffd3ff3003d33fd43020f9005003baf2e2c1f800820afaf08070fb02821043c7d5c9c8cb1fcb3fcc12cbffc9718010c8cb055003cf1670fa0212cb6accc98306fb00030001c002014806050011a098d7da89a1ae14010002d0289d180d',
        airdropCodeHex: 'b5ee9c7241020b01000151000114ff00f4a413f4bcf2c80b0102016203020033a0df8dda89a1f48003f0c3a7fe03f0c5a861f0c7f083f085f0870202cc09040201480605007747020f84682100f8a7ea5c8cb1fcb3f5003fa0223cf165003cf16cb008208989680fa02cb00c9718018c8cb05f841cf1670fa02cb6accc98040fb008020120080700173e4020c27232c2b2fff27420002f1c3232c03e0a33c584b2fff2fff27e10ddb232c13333326001b5db611106ba4e0b048adf0698f80fc32699f80fc3300e83a6b90fd20187c32f6a2687d2000fc30e9ff80fc316a187c31fc224108308652365d470f7c20eb8580e0007971617d20187c30fc21fc21647c20e78b65ffe664f6aa718740a009cf844821043c7d5c9ba8e3cd4d3ff3021d739f2aad30701c003f2abf84201d3ff59baf2acd43052108307f40e6fa1f2adf84503f90058f008f00912c705f2e2bffa40fa0030f00a9530840ff2f0e2a6b76e5a'
      };

      const data2 = {
        initCellBase64: 'te6cckEBCAEAtgABUTNMHFeIjQMuIpWnbFtXEH/by8jSM18SEsYux+Da56W+AAAAAAUg2MugAQEU/wD0pBP0vPLICwICASAFAwG+8mwhAYIQBfXhAL7y4sDtRNDSAAHy0r6I7VT6QNP/0/8wA9M/1DAg+QBQA7ry4sH4AIIK+vCAcPsCghBDx9XJyMsfyz/MEsv/yXGAEMjLBVADzxZw+gISy2rMyYMG+wAEAAHAAgFIBwYAEaCY19qJoa4UAQAC0Etue4k=',
        deployCellBase64: 'te6cckEBAQEAMAAAW2EMpGwAAAAAAAAAAIAa4/bjrmvZc+fiuKnNL45tNmTfXkpcjvcQ+HkiznKullBcU5Cg',
        codeCellBase64: 'te6cckECCwEAAVEAART/APSkE/S88sgLAQIBYgMCADOg343aiaH0gAPww6f+A/DFqGHwx/CD8IXwhwICzAkEAgFIBgUAd0cCD4RoIQD4p+pcjLH8s/UAP6AiPPFlADzxbLAIIImJaA+gLLAMlxgBjIywX4Qc8WcPoCy2rMyYBA+wCAIBIAgHABc+QCDCcjLCsv/ydCAALxwyMsA+CjPFhLL/8v/yfhDdsjLBMzMyYAG122ERBrpOCwSK3waY+A/DJpn4D8MwDoOmuQ/SAYfDL2omh9IAD8MOn/gPwxahh8MfwiQQgwhlI2XUcPfCDrhYDgAHlxYX0gGHww/CH8IWR8IOeLZf/mZPaqcYdAoAnPhEghBDx9XJuo481NP/MCHXOfKq0wcBwAPyq/hCAdP/WbryrNQwUhCDB/QOb6HyrfhFA/kAWPAI8AkSxwXy4r/6QPoAMPAKlTCED/Lw4qa3blo='
      }

      // Extract values from the data
      const { airdropContractAddress, jettonWallet, helperCodeHex, merkleRoot, airdropCodeHex } = data;

      // Convert hex to BOC for helper code and main contract code
      const helperCode = Cell.fromBoc(Buffer.from(helperCodeHex, "hex"))[0];
      let codeCell = Cell.fromBoc(Buffer.from(airdropCodeHex, "hex"))[0];

      // Ensure `jettonWallet` is parsed as an Address
      const jettonWalletAddress = Address.parse(jettonWallet);

      // Create the initialization data cell (`dataCell`)
      let dataCell = beginCell()
        .storeUint(0, 2) // Version number for the Airdrop contract
        .storeUint(new BN(merkleRoot.toString()), 256) // Merkle root
        .storeRef(helperCode) // Helper code
        .storeUint(Math.floor(Math.random() * 1e9), 64) // Random salt
        .endCell();

      console.log("init cell : ", dataCell.toBoc().toString("base64"));

      // Construct the `stateInit` with code and data
      const stateInitCell = new Cell();


      const bocBuffer = Buffer.from(data2.initCellBase64, "base64");
      dataCell = Cell.fromBoc(bocBuffer)[0];

      codeCell = Cell.fromBoc(Buffer.from(data2.codeCellBase64, "base64"))[0]

      new StateInit({ data: dataCell, code: codeCell }).writeTo(stateInitCell);

      // Create deployment payload
      const deploymentCell = beginCell()
        .storeUint(0x610ca46c, 32) // Custom OpCode for deployment
        .storeUint(0, 64) // Query ID, usually 0
        .storeAddress(jettonWalletAddress) // Address of jetton wallet
        .endCell();

      console.log("Deployment cell : ", deploymentCell.toBoc().toString("base64"));

      // Prepare the transaction for TonConnectUI
      const transaction = {
        network: CHAIN.TESTNET, 
        validUntil: Math.floor(Date.now() / 1000) + 300, // Valid for 5 minutes
        messages: [
          {
            address: airdropContractAddress,
            amount: DEPLOY_GAS.toString(),
            stateInit: stateInitCell.toBoc().toString("base64"),
            payload: data2.deployCellBase64,
            bounce: false, // Disable bounce for deployment
          },
        ],
      };

      // Send transaction using TonConnectUI
      await tonConnectUI.sendTransaction(transaction);
      setAd(airdropContractAddress);
      console.log("Contract deployed at:", airdropContractAddress);
    } catch (error) {
      console.error("Deployment error:", error);
      alert("Failed to deploy the contract.");
    }
  }

  return (
    <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
      <TonConnectButton />
      <button onClick={deployContract}>Deploy Contract</button>
      <div style={{ maxWidth: "500px", overflow: "auto", marginTop: "10px" }}>
        {ad}
      </div>
    </div>
  );
}