import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import { CHAIN } from '@tonconnect/protocol';
import "./style.css";
import {
  Address,
  beginCell,
  toNano,
  Cell,
  StateInit,
  contractAddress
} from "ton";
import BN from "bn.js";
import { useEffect, useState } from "react";
import qs from "qs";
import { TonClient4 } from "ton";  // Import TonClient4
import { getHttpV4Endpoint } from "@orbs-network/ton-access";
import { Dictionary } from "@ton/core";

// Specify gas required for deployment
export const DEPLOY_GAS = toNano("0.1");

export default function App() {
  const [ad, setAd] = useState("");
  const [address, setAddress] = useState("");
  const [deployLink, setDeployLink] = useState("");
  const [contractStatus, setContractStatus] = useState("");
  const walletAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();
  
  // State for the endpoint and TonClient4 instance
  const [client4, setClient4] = useState<TonClient4 | null>(null);

  // Use useEffect to fetch the endpoint and initialize TonClient4
  useEffect(() => {
    async function initializeClient() {
      const endpoint = await getHttpV4Endpoint({
        network: "testnet",
      });
      setClient4(new TonClient4({ endpoint }));
    }
    initializeClient();
  }, []);

  async function deployMinter() {
    if (!client4) {
      console.log("Client not initialized yet.");
      return;
    }

    try {
      

    } catch (err) {
      console.error("Error calling get_wallet_address:", err);
      alert("Failed to retrieve the jetton wallet address.");
    }
  }  

  async function deployContract() {
    try {
      const ownerAddress = Address.parse(walletAddress);
  
      // Data from backend (including contract and helper hex codes)
      const data = {
        dictCellBase64: 'te6cckEBAQEAKgAAT9AIAKgfVaKEoRubk9A4zPefVG54jrtSl7fQ9njAO8ULsU4SjuaygBBi5I1J',
        merkleRoot: 92809725053853176027830988708193645447941139483491440242080957149474509985528n,
        helperCodeHex: 'b5ee9c7241010701008a000114ff00f4a413f4bcf2c80b01020120040201bef26c2101821005f5e100bef2e2c0ed44d0d20001f2d2be88ed54fa40d3ffd3ff3003d33fd43020f9005003baf2e2c1f800820afaf08070fb02821043c7d5c9c8cb1fcb3fcc12cbffc9718010c8cb055003cf1670fa0212cb6accc98306fb00030001c002014806050011a098d7da89a1ae14010002d0289d180d',
        airdropCodeHex: 'b5ee9c7241020b01000151000114ff00f4a413f4bcf2c80b0102016203020033a0df8dda89a1f48003f0c3a7fe03f0c5a861f0c7f083f085f0870202cc09040201480605007747020f84682100f8a7ea5c8cb1fcb3f5003fa0223cf165003cf16cb008208989680fa02cb00c9718018c8cb05f841cf1670fa02cb6accc98040fb008020120080700173e4020c27232c2b2fff27420002f1c3232c03e0a33c584b2fff2fff27e10ddb232c13333326001b5db611106ba4e0b048adf0698f80fc32699f80fc3300e83a6b90fd20187c32f6a2687d2000fc30e9ff80fc316a187c31fc224108308652365d470f7c20eb8580e0007971617d20187c30fc21fc21647c20e78b65ffe664f6aa718740a009cf844821043c7d5c9ba8e3cd4d3ff3021d739f2aad30701c003f2abf84201d3ff59baf2acd43052108307f40e6fa1f2adf84503f90058f008f00912c705f2e2bffa40fa0030f00a9530840ff2f0e2a6b76e5a'
      };
  
      const { helperCodeHex, merkleRoot, airdropCodeHex } = data;
  
      const helperCode = Cell.fromBoc(Buffer.from(helperCodeHex, "hex"))[0];
      let codeCell = Cell.fromBoc(Buffer.from(airdropCodeHex, "hex"))[0];
  
      let dataCell = beginCell()
        .storeUint(0, 2)
        .storeUint(new BN(merkleRoot.toString()), 256)
        .storeRef(helperCode)
        .storeUint(Math.floor(Math.random() * 1e9), 64)
        .endCell();
  
      // Construct payloadCell with deploy-specific data
  
      const stateInitCell = new Cell();
      new StateInit({ data: dataCell, code: codeCell }).writeTo(stateInitCell);
  
      const address = contractAddress({ workchain: 0, initialCode: codeCell, initialData: dataCell });
      console.log("Contract address: ", address.toString());
      setAddress(address.toString());
      

      //-----------------Jetton Wallet Address-----------------

      
      if (!client4) {
        console.log("Client not initialized yet.");
        return;
      }

      const latestBlock = await client4.getLastBlock();
      const { exitCode, result } = await client4.runMethod(
        latestBlock.last.seqno,
        Address.parse("kQBuL35TWpJSC98XkCw1anchPeqL9mDJQweay8GgbZ46uATj"),
        "get_wallet_address",
        [{ type: 'slice', cell: beginCell().storeAddress(address).endCell() }]
      );

      if (exitCode !== 0) {
        console.log("Running getter method failed with exit code:", exitCode);
        return;
      }

      if (result[0].type !== "slice") {
        console.log("Unexpected result type:", result[0].type);
        return;
      }
      
      let jettonWallet = result[0].cell.beginParse().readAddress();

      //--------------------------------------------------------



      console.log("Jetton wallet address NOW : ", jettonWallet?.toString()|| "No address found");
      
      let payloadCell = beginCell()
        .storeUint(0x610ca46c, 32)
        .storeUint(0, 64)
        .storeAddress(jettonWallet)
        .endCell();
  
      const transaction = {
        network: CHAIN.TESTNET, // specify testnet network
        validUntil: Math.floor(Date.now() / 1000) + 300, // expire after 5 minutes
        messages: [
          {
            address: address.toString(),
            amount: toNano(0.05).toString(10), // deployment gas
            stateInit: stateInitCell.toBoc({ idx: false }).toString("base64"), // contract initialization data
            payload: payloadCell.toBoc({ idx: false }).toString("base64"), // Add payload cell as the body
            bounce: false,
          },
        ],
      };
  
      // Send transaction using TonConnectUI
      await tonConnectUI.sendTransaction(transaction);
      setAd(address.toString());
    } catch (error) {
      console.error("Deployment error:", error);
      alert("Failed to deploy the contract.");
    }
  }
  
  async function claimContract() {
    try {
      if (!client4) {
        console.log("Client not initialized yet.");
        return;
      }
  
      // Replace with the actual airdrop contract address and proofHash provided as a string
      const airdropAddress = Address.parse("kQApuzSuxmSdsW437H6Em0nzMV8YRESMd6MJZQyxNEpZh9FR"); // Example address
      const proofHash = "6b9b37ee911e6fe5b6afe38c892cc05795c5d92a73cd15b5fc577a6671b6295c"; // Provided proofHash as hex string
      const entryIndex = 0n; // Replace with the actual index if needed
  
      const codeCell = Cell.fromBoc(Buffer.from('b5ee9c7241020b01000151000114ff00f4a413f4bcf2c80b0102016203020033a0df8dda89a1f48003f0c3a7fe03f0c5a861f0c7f083f085f0870202cc09040201480605007747020f84682100f8a7ea5c8cb1fcb3f5003fa0223cf165003cf16cb008208989680fa02cb00c9718018c8cb05f841cf1670fa02cb6accc98040fb008020120080700173e4020c27232c2b2fff27420002f1c3232c03e0a33c584b2fff2fff27e10ddb232c13333326001b5db611106ba4e0b048adf0698f80fc32699f80fc3300e83a6b90fd20187c32f6a2687d2000fc30e9ff80fc316a187c31fc224108308652365d470f7c20eb8580e0007971617d20187c30fc21fc21647c20e78b65ffe664f6aa718740a009cf844821043c7d5c9ba8e3cd4d3ff3021d739f2aad30701c003f2abf84201d3ff59baf2acd43052108307f40e6fa1f2adf84503f90058f008f00912c705f2e2bffa40fa0030f00a9530840ff2f0e2a6b76e5a', "hex"))[0];


      // Construct the stateInit for claim contract
      const dataCell = beginCell()
        .storeBit(false) // Indicates that the address is not "anycast"
        .storeAddress(airdropAddress) // Airdrop contract address
        .storeBuffer(Buffer.from(proofHash, 'hex')) // Provided proofHash
        .storeUint(new BN(entryIndex.toString()), 256) // Entry index for the claim
        .endCell();

      const stateInitCell = new Cell();
      new StateInit({ data: dataCell, code: codeCell }).writeTo(stateInitCell);
  
      const address = contractAddress({ workchain: 0, initialCode: codeCell, initialData: dataCell });
      console.log("Cliam Contract address: ", address.toString());
      setAddress(address.toString());
  
      // Transaction configuration for the claim request
      const transaction = {
        network: CHAIN.TESTNET, // Specify testnet network
        validUntil: Math.floor(Date.now() / 1000) + 300, // Expire after 5 minutes
        messages: [
          {
            address: address.toString(), // Claim contract address
            amount: toNano(0.05).toString(10), // Set appropriate gas value
            stateInit: stateInitCell.toBoc({ idx: false }).toString("base64"), // StateInit for claim initialization
            bounce: false,
          },
        ],
      };
  
      // Send claim transaction using TonConnectUI
      await tonConnectUI.sendTransaction(transaction);
      console.log("Claim transaction sent!");
    } catch (error) {
      console.error("Error during claim:", error);
      alert("Failed to claim airdrop.");
    }
  }
  
  
  async function onchainTestScript() {
    try {
      
      const contractAddress = Address.parse(address);

      const latestBlock = await client4.getLastBlock();
      const status = await client4.getAccount(latestBlock.last.seqno, contractAddress);

      if (status.account.state.type !== "active") {
        console.log("Contract is not active");
        setContractStatus("Contract is not active");
      } else {
        console.log("Contract is active");
        setContractStatus("Contract is active");
      }
    } catch (error) {
      console.error("Error checking contract status:", error);
    }
  }

  return (
    <div style={{ display: "flex", gap: 20, flexDirection: "column" }}>
      <TonConnectButton />
      <button onClick={deployContract}>Deploy Contract</button>
      <button onClick={claimContract}>Claim Contract</button>
      {deployLink && (
        <div>
          <a href={deployLink} target="_blank" rel="noopener noreferrer">
            Click here to deploy via Tonkeeper
          </a>
        </div>
      )}
      <button onClick={onchainTestScript}>Check Contract Status</button>
      {contractStatus && <div>{contractStatus}</div>}
      <div style={{ maxWidth: "500px", overflow: "auto", marginTop: "10px" }}>
        {ad}
      </div>
    </div>
  );
}
