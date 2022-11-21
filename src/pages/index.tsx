import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { GridLayout, GridItemMain } from '@ui';
import { PublicationList } from '@components/publication/publication_list';
import styles from '@/styles/Home.module.css'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <GridLayout>
        <GridItemMain>
          <PublicationList />
        </GridItemMain>
      </GridLayout>
    </div>
  )
}

export default Home
