async function deployContract() {
    const ownerAddress = Address.parse(walletAddress);
  
    // Step 1: Prepare Initial State Cell (code + data)
    const merkleRoot = BigInt('80785058436687609564007501320241228114376519516116650305413464446587479972467');
    const helperCode = Cell.fromBoc(helperHex.hex)[0];
    
    const dataCell = beginCell()
      .storeUint(merkleRoot, 256) // Store merkleRoot
      .storeRef(helperCode) // Store helperCode
      .endCell();
  
    const initialStateCell = new Cell();
    new StateInit({ code: Cell.fromBoc(minterHex.hex)[0], data: dataCell }).writeTo(initialStateCell);
  
    // Step 2: Calculate the contract address (airdropAddress) based on initial state
    const airdropAddress = contractAddress({
      workchain: 0,
      initialCode: Cell.fromBoc(minterHex.hex)[0],
      initialData: dataCell,
    });
  
    console.log(`Airdrop contract address calculated: ${airdropAddress.toString()}`);
  
    // Step 3: Prepare Deployment Message Cell (contains jettonWallet and other details)
    const jettonWalletAddress = await jettonMinter.getWalletAddressOf(airdropAddress);
  
    const deployMessageCell = beginCell()
      .storeUint(0x610ca46c, 32) // Specific operation ID or message type
      .storeUint(0, 64) // Additional field, if needed
      .storeAddress(jettonWalletAddress) // Include the jettonWallet address
      .endCell();
  
    // Step 4: Set up SendTransactionRequest with both stateInit and deployment payload
    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000, // Valid for 5 minutes
      messages: [
        {
          address: airdropAddress.toString(), // Address for the contract deployment
          amount: DEPLOY_GAS.toString(), // Gas limit or value for deployment
          stateInit: initialStateCell.toBoc().toString("base64"), // Contract's initial state
          payload: deployMessageCell.toBoc().toString("base64"), // Deployment-specific payload
        },
      ],
    };
  
    // Send transaction to deploy contract
    await tonConnectUI.sendTransaction(tx);
    
    console.log(`Contract deployed at: ${airdropAddress.toString()}`);
    setAd(airdropAddress.toString());
  }
  