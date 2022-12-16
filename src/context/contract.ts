import { createContext } from "react";
import { ethers } from "ethers";

export interface ContractContextType {
  lensHub: ethers.Contract | null;
}

export const ContractContext = createContext<ContractContextType>({
  lensHub: null,
});