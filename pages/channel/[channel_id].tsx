import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Channel: NextPage = () => {

  const router = useRouter();
  const { channel_id } = router.query
  return <div>channel: {channel_id}</div>
}

export default Channel;