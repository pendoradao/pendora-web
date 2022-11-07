import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { Box, Card, CardActions, CardContent, Button, Divider, Typography } from '@mui/material';

import styles from '../styles/Home.module.css'

const ChannelDataList = [
  {
    id: 1,
    text: "This is channel 1",
  },
  {
    id: 2,
    text: "This is channel 2",
  }
]

interface ChannelData {
  id: number;
  text: string;
  handerClick: (id: number)=>void;
}

const ChannelCard = (channelData: ChannelData ) => {
  return (
    <Card 
      sx={{ minWidth: 225, minHeight: 225 }} 
      className={styles.card} 
      onClick={()=>channelData.handerClick(channelData.id)}>
      <CardContent>
        <Typography variant="h6" >
          {channelData.text}
        </Typography>
      </CardContent>
  </Card>
  )
}

const MyChannels = () => {

  const router = useRouter();
  const handerClick = (id: number) => {
    router.push(`/channel/${id}`)
  }
  return (
    <Box sx={{marginTop: 8, paddingTop: 4, width: 800, borderTop: 1, borderColor: "divider"}}>
      <Box sx={{display: 'flex'}}>
        <Typography variant="h5" >
          My Channels
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Button variant="contained">New</Button>
      </Box>
        <div className={styles.grid}>
          {
            ChannelDataList.map((channel) => (
              <ChannelCard key={channel.id} id={channel.id} text={channel.text} handerClick={handerClick}/>
            ))
          }
        </div>
    </Box>
  )
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {/* Welcome to <a href="https://nextjs.org">Next.js!</a> */}
          Welcome to Pendora!
        </h1>
        <MyChannels />

      </main>
    </div>
  )
}

export default Home
