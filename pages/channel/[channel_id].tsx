import type { NextPage } from 'next';
import Link from 'next/link'
import { useRouter } from 'next/router';


interface TopicData {
  id: number;
  text: string;
}

const TopicDataList = [
  {
    id: 1,
    text: "This is topic 1",
  },
  {
    id: 2,
    text: "This is topic 2",
  },
  {
    id: 3,
    text: "This is topic 3",
  },
  {
    id: 4,
    text: "This is topic 3",
  },
  {
    id: 5,
    text: "This is topic 3",
  }
]

const Channel: NextPage = () => {
  const router = useRouter();
  const { channel_id } = router.query

  return (
    <div>
      channel: {channel_id}
      {
        TopicDataList.map((topic) => (
          <Topic key={topic.id} id={topic.id} text={topic.text} />
        ))
      }
    </div>
  )
}


const Topic = (topic_data: TopicData) => {
  const router = useRouter()

  return (
    <div>
      <Link href={`/channel/${router.query.channel_id}/topic/${topic_data.id}`}>
      {topic_data.text} 
      </Link>
    </div>
  )
}

export default Channel;
