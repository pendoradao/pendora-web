import type { NextApiRequest, NextApiResponse } from 'next';

import ChannelDataList from './channel_data.json';

const ChannelDataMap = new Map();

ChannelDataList.forEach((channel) => {
  ChannelDataMap.set(channel.id, channel);
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { channel_id } = req.query;
  const realChannelId = parseInt(channel_id as string);
  // console.log(`channelId: ${channel_id}, realChannelId: ${realChannelId}`);
  const channel = ChannelDataMap.get(realChannelId);
  res.status(200).json(channel)
}
