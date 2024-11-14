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
  import { useState } from "react";
  import qs from "qs";
  import { TonClient4 } from "ton";  // Import TonClient4
  import { getHttpV4Endpoint } from "@orbs-network/ton-access";
  
  // Specify gas required for deployment
  export const DEPLOY_GAS = toNano("0.1");
  
  export default function App() {
    const [ad, setAd] = useState("");
    const [address, setAddress] = useState("");
    const [deployLink, setDeployLink] = useState("");
    const [contractStatus, setContractStatus] = useState("");
    const walletAddress = useTonAddress();
    const [tonConnectUI] = useTonConnectUI();
  
  
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
  
        const stateInitCell = new Cell();
        new StateInit({ data: dataCell, code: codeCell }).writeTo(stateInitCell);
  
        const address = contractAddress({ workchain: 0, initialCode: codeCell, initialData: dataCell });
        console.log("Contract address: ", address.toString());
        setAddress(address.toString());
  
        const transaction = {
            network: CHAIN.TESTNET, // specify testnet network
            validUntil: Math.floor(Date.now() / 1000) + 300, // expire after 5 minutes
            messages: [
              {
                address: address.toString(),
                amount: toNano(0.05).toString(10), // deployment gas
                stateInit: stateInitCell.toBoc({ idx: false }).toString("base64"), // contract initialization data
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
  
    async function onchainTestScript() {
      try {
        
        const contractAddress = Address.parse(address);
        
        const endpoint = await getHttpV4Endpoint({
          network: "mainnet",
        });
        const client4 = new TonClient4({ endpoint });
  
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
  