import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Button, Divider, Typography } from '@mui/material';

import styles from '../styles/Home.module.css'

interface ChannelData {
  id: number;
  text: string;
  handerClick: (id: number) => void;
}

const ChannelCard = (channelData: ChannelData) => {
  return (
    <Card
      sx={{ minWidth: 225, minHeight: 225 }}
      className={styles.card}
      onClick={() => channelData.handerClick(channelData.id)}>
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

  const [channelDataList, setChannelDataList] = useState(Array<{ id: number; text: string }>)

  useEffect(() => {
    fetch('/api/channel')
      .then((res) => res.json())
      .then((data) => {
        setChannelDataList(data.data)
      })
  }, [])

  return (
    <Box sx={{ marginTop: 8, paddingTop: 4, width: 800 }}>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h5" >
          My Channels
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Button variant="contained">New</Button>
      </Box>
      <div className={styles.grid}>
        {
          channelDataList.map((channel) => (
            <ChannelCard key={channel.id} id={channel.id} text={channel.text} handerClick={handerClick} />
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
