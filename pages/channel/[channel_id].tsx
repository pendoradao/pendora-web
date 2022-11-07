import type { NextPage } from 'next';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { Box, Grid, Button, Divider,  Typography } from '@mui/material';


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
    text: "This is topic 4",
  },
  {
    id: 5,
    text: "This is topic 5",
  }
]

const Topic = (topic_data: TopicData) => {
  const router = useRouter()

  return (
    <Box sx={{height: '3em'}}>
      <Link href={`/channel/${router.query.channel_id}/topic/${topic_data.id}`}>
        <Typography variant="h5" >
          {topic_data.text} 
        </Typography>
      </Link>
    </Box>
  )
}

const Channel: NextPage = () => {
  const router = useRouter();
  const { channel_id } = router.query

  return (
    <Grid container spacing={2}>
      <Grid item xs={0} sm={4}/>
      <Grid item xs={12} sm={4}>
        <Box sx={{display: 'flex'}}>
          <Typography variant="h4" >
            channel: {channel_id}
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Button variant="contained">New Topic</Button>
        </Box>
        <Box sx={{marginTop: 2}}>
          {
            TopicDataList.map((topic) => (
              <Topic key={topic.id} id={topic.id} text={topic.text} />
            ))
          }
        </Box>
      </Grid>
    </Grid>
  )
}


export default Channel;
