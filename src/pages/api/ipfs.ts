import type { NextApiRequest, NextApiResponse } from 'next'
import { create } from 'ipfs-http-client';

import { IPFS_PROJECT_ID, IPFS_SECRET } from '@constants';

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(`${IPFS_PROJECT_ID}:${IPFS_SECRET}`, 'utf-8').toString('base64')}`,
  }
});

const upoadToIPFS = async (data: any) => {
  console.log('data', data)
  console.log(JSON.stringify(data))
  return await client.add(JSON.stringify(data));
  // return await client.add(data);
};

const getUploadToIPFSLink = async (content: object) => {
  const ipfsResult = await upoadToIPFS(content);
  return `ipfs://${ipfsResult.path}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Method not allowed' })
    return
  }
  const IPFSLink = await getUploadToIPFSLink(req.body)
  res.status(200).json({
    url: IPFSLink
  })
}