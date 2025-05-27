import {
  bscTestnet,
  bsc,
  polygonAmoy,
  polygon,
  avalanche,
  avalancheFuji,
  sonic,
  sonicBlazeTestnet,
} from "wagmi/chains";

export enum Network {
  BSC = "bsc",
  BSC_TESTNET = "bscTestnet",
  POLYGON = "polygon",
  POLYGON_AMOY = "polygonAmoy",
  AVALANCHE = "avax",
  AVALANCHE_FUJI = "avaxFuji",
  SONIC = "sonic",
  SONIC_TESTNET = "sonicTestnet",
}
export const networkMap = {
  [Network.BSC]: bsc,
  [Network.BSC_TESTNET]: bscTestnet,
  [Network.POLYGON]: polygon,
  [Network.POLYGON_AMOY]: polygonAmoy,
  [Network.AVALANCHE]: avalanche,
  [Network.AVALANCHE_FUJI]: avalancheFuji,
  [Network.SONIC]: sonic,
  [Network.SONIC_TESTNET]: sonicBlazeTestnet,
};
