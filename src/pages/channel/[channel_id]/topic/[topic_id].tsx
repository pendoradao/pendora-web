import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Box, Card, CardContent, CardActions, Grid, Button, Divider,  Typography, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface CommentData {
  id: number;
  text: string;
  count: number;
}

const CommentDataList = [
  {
    id: 1,
    text: "Comment 1",
    count: 10
  },
  {
    id: 2,
    text: "Comment 2",
    count: 8
  },
  {
    id: 3,
    text: "Comment 3",
    count: 15
  }
]

const Topic: NextPage = () => {
  const router = useRouter();
  const { topic_id } = router.query;

  return (
    <Grid container spacing={2}>
      <Grid item xs={0} sm={4}/>
        <Grid item xs={12} sm={4}>
        topic: {topic_id}
        {
          CommentDataList.map((comment) => (
            <Comment key={comment.id} id={comment.id} text={comment.text} count={comment.count}/>
          ))
        }
      </Grid>
    </Grid>
  )
}

const Comment = (commentData: CommentData) => {
  return (
    <Card sx={{marginTop: 2}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          0x1234567890
        </Typography>
        {commentData.text}
      </CardContent>
      <CardActions>
      <Button variant="contained" endIcon={<CheckIcon />}>
        {commentData.count}
      </Button>
      </CardActions>
    </Card>
  )
}

export default Topic;