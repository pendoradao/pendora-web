import type { NextApiRequest, NextApiResponse } from 'next';

import ChannelDataList from './channel_data.json';

  export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    res.status(200).json({ count: ChannelDataList.length, data: ChannelDataList })
  }
  