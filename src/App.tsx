import { TomoContextProvider, useTomo } from "@tomo-inc/tomo-web-sdk";

const CLIENT_ID =
  "dti0Dx9utD2Rntzq5Xoop6hb1UNTCcKTM4c1guxmiPjf6TyyipDcNptEgm5ApU4BGOserp3Tx2ocXjUbZX7zEBRQ";

enum Theme {
  Light = "light",
  Dark = "dark",
}

export default function App() {
  return (
    <TomoContextProvider
      theme={Theme.Light}
      clientId={CLIENT_ID}
      chainTypes={["bitcoin"]}
    >
      <ChildComponent />
    </TomoContextProvider>
  );
}
export function ChildComponent() {
  const tomoState = useTomo();
  const { openConnectModal, disconnect, connected, providers } = tomoState;
  const btcProvider = providers.bitcoinProvider;

  return (
    <div className={"tomo-social tm-size-screen tm-flex tm-text-sm"}>
      <div
        className={
          "tomo-social tm-size-screen tm-flex tm-flex-col tm-text-sm sm:tm-flex-row"
        }
      >
        <div
          className={
            "tm-h-full tm-flex-col tm-gap-4 tm-overflow-auto tm-border-r tm-border-r-tc1/10 tm-p-10 md:tm-flex md:tm-flex-1"
          }
        >
          <div className={"tm-flex tm-flex-wrap tm-gap-3"}>
            <button
              onClick={() => {
                openConnectModal();
              }}
            >
              openConnectModal
            </button>
            <button
              disabled={!connected}
              onClick={async () => {
                await disconnect();
              }}
            >
              disconnect
            </button>

            <button
              onClick={async () => {
                const address = await btcProvider?.getAddress();
                console.log("address", address);
              }}
              disabled={!connected}
            >
              get address
            </button>

            <button
              onClick={async () => {
                const balance = await btcProvider?.getBalance();
                console.log("balance", balance);
              }}
              disabled={!connected}
            >
              get balance
            </button>

            <button
              onClick={async () => {
                const pubKey = await btcProvider?.getPublicKeyHex();
                console.log("pubKey", pubKey);
              }}
              disabled={!connected}
            >
              get public key
            </button>

            <button
              onClick={async () => {
                const network = await btcProvider?.getNetwork();
                console.log("network", network);
              }}
              disabled={!connected}
            >
              get network
            </button>

            <button
              onClick={async () => {
                await btcProvider?.switchNetwork("signet");
              }}
              disabled={!connected}
            >
              switch to signet
            </button>

            <button
              onClick={async () => {
                await btcProvider?.switchNetwork("mainnet");
              }}
              disabled={!connected}
            >
              switch to mainnet
            </button>

            <button
              onClick={async () => {
                try {
                  const res = await btcProvider?.signMessage("hello world");
                  console.log("sign message result", res);
                } catch (error) {
                  console.error(error);
                }
              }}
              disabled={!connected}
            >
              Sign Message(btc ecdsa)
            </button>

            <button
              onClick={async () => {
                const address = await btcProvider?.getAddress();
                const amount = "0.000001";
                const feeRate = 1;
                const hash = await btcProvider.sendBitcoin(
                  address,
                  amount,
                  feeRate
                );
                console.log("sendBitcoin result", hash);
              }}
              disabled={!connected}
            >
              send btc
            </button>

            {/* <button
              onClick={async () => {
                const address = await btcProvider?.getAddress();
                const amount = "0.001";
                const feeRate = 1;
                const psbt = new Psbt({ network: networks.testnet });

                // 添加输入
                psbt.addInput({
                  hash: "input_txid",
                  index: input_index, // utxo.outputInde
                  witnessUtxo: {
                    script: Buffer.from("prevout_script_hex", "hex"),
                    value: input_amount_satoshis, // utxo satoshis
                  },
                });

                // 添加输出
                psbt.addOutput({
                  address: "recipient_address",
                  value: 10000, //
                });
                psbt.addOutput({
                  address: "change_address", // your address, odd change
                  value: 100000, // your balance - outPutValue
                });
                const psbtHex = psbt.toHex();
                const hash = await btcProvider.signPsbt(psbtHex);
                console.log("sign psbt result:", hash);
              }}
              disabled={!connected}
            >
              signPsbt
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
