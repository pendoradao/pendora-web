import { create } from 'ipfs-http-client';

import { IPFS_PROJECT_ID, IPFS_SECRET } from '@constants';

export const getIPFSLink = (hash: string): string => {
  const infuraIPFS = 'https://ipfs.infura.io/ipfs/';

  return hash
    .replace(/^Qm[1-9A-Za-z]{44}/gm, `${infuraIPFS}${hash}`)
    .replace('https://ipfs.io/ipfs/', infuraIPFS)
    .replace('ipfs://', infuraIPFS);
};

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(`${IPFS_PROJECT_ID}:${IPFS_SECRET}`, 'utf-8').toString('base64')}`,
  }
});

export const upoadToIPFS = async (data: any) => {
  return await client.add(JSON.stringify(data));
};

export const getIPFSResult = async (content: object) => {
  const ipfsLink = await upoadToIPFS(content);
  return `ipfs://${ipfsLink.path}`;
}