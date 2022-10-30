import {
  ConnectWallet,
  useContract,
  useContractRead,
  useContractWrite,
  Web3Button,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

const contractAddress = "0xd5B4b81194614F6f6fd67BEdCe8805782F09551a";

export default function Home() {
  const { contract } = useContract(contractAddress);

  const {
    data: nfts,
    isLoading,
    error,
  } = useNFTs(contract, { start: 0, count: 100 });

  // read data using useContractRead
  const { data: contractName } = useContractRead(contract, "name");
  console.log(contractName);

  //

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
          nfts.map((nft) => (
          <>
          <ThirdwebNftMedia
            key={nft.metadata.id.toString()}
            metadata={nft.metadata}
            style={{ width: 200 }}
          />
          <p>{nft.metadata.name}</p>
          </>
        ))
      )}

      <div style={{ maxWidth: 200 }}>
        <Web3Button
          contractAddress={contractAddress}
          action={() =>
            contract.erc721.mint({
              name: "hello world",
              description: "hello world this is the description",
              image:
                "https://portal.thirdweb.com/img/thirdweb-logo-transparent-black.svg",
            })
          }
        >
          MINT AN NFT
        </Web3Button>
      </div>
    </div>
  );
}
