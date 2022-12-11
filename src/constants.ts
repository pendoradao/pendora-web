import { chain } from 'wagmi';

// App
export const APP_NAME = "Pendora";

// Environments
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const IS_MAINNET = process.env.NEXT_PUBLIC_IS_MAINNET === 'true';

// API endpoints
export const API_URL = "https://api-mumbai.lens.dev";

// Web3
export const POLYGON_MAINNET = {
  ...chain.polygon,
  name: 'Polygon Mainnet',
  rpcUrls: { default: 'https://polygon-rpc.com' }
};
export const POLYGON_MUMBAI = {
  ...chain.polygonMumbai,
  name: 'Polygon Mumbai',
  rpcUrls: { default: 'https://rpc-mumbai.maticvigil.com' }
};
export const CHAIN_ID = IS_MAINNET ? POLYGON_MAINNET.id : POLYGON_MUMBAI.id;

// Regex
export const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
export const ADDRESS_REGEX = /^(0x)?[0-9a-f]{40}$/i;
export const HANDLE_REGEX = /^[\da-z]+$/;

// State
export const LOCAL_STORAGE_KEY = "pendora.store";