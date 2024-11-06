import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI
} from "@tonconnect/ui-react";
import "./style.css";
import { Address, beginCell, Cell, toNano } from "ton";
import { ContractDeployer } from "./contract-deployer";
import BN from "bn.js";
import minterHex from "./lib/contracts/jetton-minter.compiled.json";

interface ContractDeployDetails {
  deployer: Address;
  value: BN;
  code: Cell;
  data: Cell;
  message?: Cell;
  dryRun?: boolean;
}

// Specify gas required for deployment
export const DEPLOY_GAS = toNano(0.00);

// Main application component for deploying the contract
export default function App() {
  const walletAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  async function deployContract() {
    const ownerAddress = Address.parse(walletAddress);

    const deployParams: ContractDeployDetails = {
      deployer: ownerAddress,
      value: DEPLOY_GAS,
      code: Cell.fromBoc(minterHex.hex)[0], 
      data: beginCell().storeAddress(ownerAddress).endCell(),
    };

    const contractAddress = await new ContractDeployer().deployContract(
      deployParams,
      tonConnectUI
    );

    console.log("Contract deployed at:", contractAddress.toString());
  }

  return (
    <div>
      <TonConnectButton />
      <button onClick={deployContract}>Deploy Contract</button>
    </div>
  );
}
