import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import "./style.css";
import { Address, beginCell, Cell, toNano } from "ton";
import { ContractDeployer } from "./contract-deployer";
import BN from "bn.js";
import minterHex from "./lib/contracts/jetton-minter.compiled.json";
import helperHex from "./lib/contracts/jetton-wallet.compiled.json";

import { useState } from "react";
import claim from "./claim";
import callContract from "./callContract";

interface ContractDeployDetails {
  deployer: Address;
  value: BN;
  code: Cell;
  data: Cell;
  message?: Cell;
  dryRun?: boolean;
}

// Specify gas required for deployment
export const DEPLOY_GAS = toNano(0.05);

// Main application component for deploying the contract
export default function App() {
  const [ad, setAd] = useState("");
  const walletAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  async function deployContract() {
    const ownerAddress = Address.parse(walletAddress);


    const merkleRoot =  BigInt(80785058436687609564007501320241228114376519516116650305413464446587479972467n)
    const helperCode = Cell.fromBoc(helperHex.hex)[0];

    //EQA0nI_V6YmS3D2p5xmX-ncWJofF5xjysnNYGX-dqKASFpZp

    const {proof, entryIndex} =  claim("EQA0nI_V6YmS3D2p5xmX-ncWJofF5xjysnNYGX-dqKASFpZp");

    const dataCell = beginCell()
    .storeBit(false)
    .storeAddress(Address.parse("EQA0nI_V6YmS3D2p5xmX-ncWJofF5xjysnNYGX-dqKASFpZp"))  //contract addresss
    .storeBuffer(proof)
    .storeUint(entryIndex, 256)
    .endCell();



    const deployParams: ContractDeployDetails = {
      deployer: ownerAddress,
      value: DEPLOY_GAS,
      code: Cell.fromBoc(helperHex.hex)[0],
      data: dataCell,
    };

    const contractAddress = await new ContractDeployer().deployContract(
      deployParams,
      tonConnectUI
    );

    console.log(contractAddress?.toString())

    // console.log(contractAddress)

    setAd(contractAddress.toString());


    // console.log("Contract deployed at:", contractAddress.toString());

    // try {
    // const d =  await claim("EQD8FH1II2BfyAFWRFI72pnBV7uDAfWBWmI7ja7uYPxryNuz");
   
    // } catch (e) {
    //   console.log(e);
    // }
  }

  return (
    <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
      <TonConnectButton />
      <button onClick={deployContract}>Deploy Contract</button>
      <div style={{ maxWidth: "500px", overflow: "auto", marginTop: "10px" }}>
        {ad}
      </div>
      <button onClick={() => callContract(tonConnectUI)}>call contract</button>
    </div>
  );
}
