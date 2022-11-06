import type { NextPage } from 'next'
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';

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
}

const ChannelCard = (channelData: ChannelData) => {
  return (
    <Card sx={{ minWidth: 225, minHeight: 225 }} className={styles.card}>
      <CardContent>
        <Typography variant="h6" >
          {channelData.text}
        </Typography>
      </CardContent>
  </Card>
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

        <div className={styles.grid}  sx={{marginTop: 40}} mt-12>
          {/* <ChannelCard /> */}
          {
            ChannelDataList.map((channel) => (
              <ChannelCard key={channel.id} id={channel.id} text={channel.text} />
            ))
          }
        </div>

        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>
    </div>
  )
}

export default Home
