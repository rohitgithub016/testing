// import {
//   TonConnectButton,
//   useTonAddress,
//   useTonConnectUI,
//   TonConnectUI
// } from "@tonconnect/ui-react";
// import { CHAIN } from '@tonconnect/protocol';
import "./style.css";
// import {
//   Address,
//   beginCell,
//   toNano,
//   Cell,
//   StateInit,
//   contractAddress,
//   Contract,
//   TonClient,
// } from "ton";
// import BN from "bn.js";
import { useEffect, useState } from "react";
// import qs from "qs";
// import { TonClient4 } from "ton";  // Import TonClient4
// import { getHttpV4Endpoint } from "@orbs-network/ton-access";
// import { Dictionary } from "@ton/core";
// import * as TonCore from "@ton/core"
import "buffer";
import {
  TonConnectUI,
  useTonConnectUI,
  useTonWallet,
  TonConnectButton
} from "@tonconnect/ui-react";
import {
  Address,
  beginCell,
  Sender,
  SenderArguments,
  storeStateInit,
  toNano,
  TonClient,
  Cell
} from "@ton/ton";
import { Dictionary } from '@ton/core';
import { Airdrop, AirdropEntry, generateEntriesDictionary, airdropEntryValue } from './wrappers/Airdrop';
import { JettonMinter } from './wrappers/JettonMinter';
import { AirdropHelper } from './wrappers/AirdropHelper';

class TonConnectProvider implements Sender {
  /**
   * The TonConnect UI instance.
   * @private
   */
  private readonly provider: TonConnectUI;

  /**
   * The address of the current account.
   */
  public get address(): Address | undefined {
    const address = this.provider.account?.address;
    return address ? Address.parse(address) : undefined;
  }

  /**
   * Creates a new TonConnectProvider.
   * @param provider
   */
  public constructor(provider: TonConnectUI) {
    this.provider = provider;
  }

  /**
   * Sends a message using the TonConnect UI.
   * @param args
   */
  public async send(args: SenderArguments): Promise<void> {
    // The transaction is valid for 10 minutes.
    const validUntil = Math.floor(Date.now() / 1000) + 600;

    // The address of the recipient, should be in bounceable format for all smart contracts.
    const address = args.to.toString({ urlSafe: true, bounceable: true });

    // The address of the sender, if available.
    const from = this.address?.toRawString();

    // The amount to send in nano tokens.
    const amount = args.value.toString();

    // The state init cell for the contract.
    let stateInit: string | undefined;
    if (args.init) {
      // State init cell for the contract.
      const stateInitCell = beginCell()
        .store(storeStateInit(args.init))
        .endCell();
      // Convert the state init cell to boc base64.
      stateInit = stateInitCell.toBoc().toString("base64");
    }

    // The payload for the message.
    let payload: string | undefined;
    if (args.body) {
      // Convert the message body to boc base64.
      payload = args.body.toBoc().toString("base64");
    }

    // Send the message using the TonConnect UI and wait for the message to be sent.
    await this.provider.sendTransaction({
      validUntil: validUntil,
      from: from,
      messages: [
        {
          address: address,
          amount: amount,
          stateInit: stateInit,
          payload: payload,
        },
      ],
    });
  }
}

// Specify gas required for deployment
export const DEPLOY_GAS = toNano("0.1");

export default function App() {
  const [ad, setAd] = useState("");
  const [address, setAddress] = useState("");
  const [deployLink, setDeployLink] = useState("");
  const [contractStatus, setContractStatus] = useState("");
  const [tonConnectUI] = useTonConnectUI();
  
  // State for the endpoint and TonClient4 instance
  const [client, setClient] = useState<TonClient | null>(null);

  // Use useEffect to fetch the endpoint and initialize TonClient4
  useEffect(() => {
    async function initializeClient() {
      setClient(new TonClient({ endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC" }));
    }
    initializeClient();
  }, []);

  async function deployContract() {
    try {
      // Data from backend (including contract and helper hex codes)
      const data = {
        dictCellBase64: 'te6cckEBBQEAiQACA8/oAgEAT0gAg+Qt2CBcjzz3M8kS5TCgSaJ1H+59StKUisZGj20H84ahdIdugBACASAEAwBPIABlDsaQvZf1bLXfDOC2/DSXKACbEFta2//RCScyxQrCuoXSHboAQABPIAfSRD6aAozu24x12ZCWgzc2YX73KDGaLZPcmuXgghvi0oXSHboAQImQJ7A=',
        merkleRoot: 84275610566086251853080991244397707401803011881599879881191551566573602581928n,
        helperCodeHex: 'b5ee9c7241010701008a000114ff00f4a413f4bcf2c80b01020120040201bef26c2101821005f5e100bef2e2c0ed44d0d20001f2d2be88ed54fa40d3ffd3ff3003d33fd43020f9005003baf2e2c1f800820afaf08070fb02821043c7d5c9c8cb1fcb3fcc12cbffc9718010c8cb055003cf1670fa0212cb6accc98306fb00030001c002014806050011a098d7da89a1ae14010002d0289d180d',
        airdropCodeHex: 'b5ee9c7241020b01000151000114ff00f4a413f4bcf2c80b0102016203020033a0df8dda89a1f48003f0c3a7fe03f0c5a861f0c7f083f085f0870202cc09040201480605007747020f84682100f8a7ea5c8cb1fcb3f5003fa0223cf165003cf16cb008208989680fa02cb00c9718018c8cb05f841cf1670fa02cb6accc98040fb008020120080700173e4020c27232c2b2fff27420002f1c3232c03e0a33c584b2fff2fff27e10ddb232c13333326001b5db611106ba4e0b048adf0698f80fc32699f80fc3300e83a6b90fd20187c32f6a2687d2000fc30e9ff80fc316a187c31fc224108308652365d470f7c20eb8580e0007971617d20187c30fc21fc21647c20e78b65ffe664f6aa718740a009cf844821043c7d5c9ba8e3cd4d3ff3021d739f2aad30701c003f2abf84201d3ff59baf2acd43052108307f40e6fa1f2adf84503f90058f008f00912c705f2e2bffa40fa0030f00a9530840ff2f0e2a6b76e5a'
      };
      const { helperCodeHex, merkleRoot, airdropCodeHex } = data;

      const airdrop = client?.open(
        Airdrop.createFromConfig(
          {
              merkleRoot,
              helperCode: Cell.fromBoc(Buffer.from(helperCodeHex, "hex"))[0],
          },
          Cell.fromBoc(Buffer.from(airdropCodeHex, "hex"))[0]
        )
      );
      const sender = new TonConnectProvider(tonConnectUI);
      const jettonMinterAddress = Address.parse('kQB3MtovD4b6Yy_4u5L26VGdLs3RSDq-wPxh68T_tSkMlj0V');
      const jettonMinter = client?.open(JettonMinter.createFromAddress(jettonMinterAddress));
      airdrop?.sendDeploy(sender, toNano('0.05'), await jettonMinter.getWalletAddressOf(airdrop.address))
      
    } catch (error) {
      console.error("Deployment error:", error);
      alert("Failed to deploy the contract.");
    }
  }
  
  async function claimContract() {
    try {
      if (!client) {
        console.log("Client not initialized yet.");
        return;
      }
      const data = {
        dictCellBase64: 'te6cckEBBQEAiQACA8/oAgEAT0gAg+Qt2CBcjzz3M8kS5TCgSaJ1H+59StKUisZGj20H84ahdIdugBACASAEAwBPIABlDsaQvZf1bLXfDOC2/DSXKACbEFta2//RCScyxQrCuoXSHboAQABPIAfSRD6aAozu24x12ZCWgzc2YX73KDGaLZPcmuXgghvi0oXSHboAQImQJ7A=',
        merkleRoot: 84275610566086251853080991244397707401803011881599879881191551566573602581928n,
        helperCodeHex: 'b5ee9c7241010701008a000114ff00f4a413f4bcf2c80b01020120040201bef26c2101821005f5e100bef2e2c0ed44d0d20001f2d2be88ed54fa40d3ffd3ff3003d33fd43020f9005003baf2e2c1f800820afaf08070fb02821043c7d5c9c8cb1fcb3fcc12cbffc9718010c8cb055003cf1670fa0212cb6accc98306fb00030001c002014806050011a098d7da89a1ae14010002d0289d180d',
        airdropCodeHex: 'b5ee9c7241020b01000151000114ff00f4a413f4bcf2c80b0102016203020033a0df8dda89a1f48003f0c3a7fe03f0c5a861f0c7f083f085f0870202cc09040201480605007747020f84682100f8a7ea5c8cb1fcb3f5003fa0223cf165003cf16cb008208989680fa02cb00c9718018c8cb05f841cf1670fa02cb6accc98040fb008020120080700173e4020c27232c2b2fff27420002f1c3232c03e0a33c584b2fff2fff27e10ddb232c13333326001b5db611106ba4e0b048adf0698f80fc32699f80fc3300e83a6b90fd20187c32f6a2687d2000fc30e9ff80fc316a187c31fc224108308652365d470f7c20eb8580e0007971617d20187c30fc21fc21647c20e78b65ffe664f6aa718740a009cf844821043c7d5c9ba8e3cd4d3ff3021d739f2aad30701c003f2abf84201d3ff59baf2acd43052108307f40e6fa1f2adf84503f90058f008f00912c705f2e2bffa40fa0030f00a9530840ff2f0e2a6b76e5a'
      };
      const dictCell = Cell.fromBase64(data.dictCellBase64);
      const dict = dictCell.beginParse().loadDictDirect(Dictionary.Keys.BigUint(256), airdropEntryValue);

      const entryIndex = 1n;

      const proof = dict.generateMerkleProof([entryIndex]);

      const helper = client.open(
          AirdropHelper.createFromConfig(
              {
                  airdrop: Address.parse('kQB91XmB1ttyKjonRJgKWm6OG1tj0Kd6nnBZ-gXfjf2W8Miq'),
                  index: entryIndex,
                  proofHash: proof.hash(),
              },
              Cell.fromBoc(Buffer.from(data.helperCodeHex, "hex"))[0]
          )
      );
      const sender = new TonConnectProvider(tonConnectUI);
      if (!(await client.isContractDeployed(helper.address))) {
        await helper.sendDeploy(sender);
        
        // Wait for 1 minute (60,000 milliseconds)
        await new Promise(resolve => setTimeout(resolve, 60000));
      }

      console.log(await helper.sendClaim(entryIndex, proof));
      
    } catch (error) {
      // debugger
      console.error("Error during claim:", error);
      alert("Failed to claim tokens.");
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
      {/* <button onClick={onchainTestScript}>Check Contract Status</button> */}
      {contractStatus && <div>{contractStatus}</div>}
      <div style={{ maxWidth: "500px", overflow: "auto", marginTop: "10px" }}>
        {ad}
      </div>
    </div>
  );
}
