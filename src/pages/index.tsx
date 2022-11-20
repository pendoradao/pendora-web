import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { GridLayout, GridItemMain } from '@ui';
// import SinglePublication from '@/components/publication/single_publication';
import { TopicList } from '@/components/publication/topic_list';
import styles from '@/styles/Home.module.css'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <GridLayout>
        <GridItemMain>
          <TopicList />
        </GridItemMain>
      </GridLayout>
    </div>
  )
}

export default Home
