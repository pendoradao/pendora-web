import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import Layout from '../../../../components/layout'


interface CommentData {
  id: number;
  text: string;
}

const CommentDataList = [
  {
    id: 1,
    text: "Comment 1",
  },
  {
    id: 2,
    text: "Comment 2",
  },
  {
    id: 3,
    text: "Comment 3",
  }
]

const Topic: NextPage = () => {
  const router = useRouter();
  const { topic_id } = router.query;

  return (
    <div>
      topic: {topic_id}
      {
        CommentDataList.map((comment) => (
          <Comment key={comment.id} id={comment.id} text={comment.text} />
        ))
      }
    </div>
  )
}

const Comment = (comment_data: CommentData) => {
  return (
    <div>
      {comment_data.text}
      <IconButton aria-label="ok">
        <CheckIcon />
    </IconButton>
    </div>
  )
}

export default Topic;