import type { NextPage } from 'next'

import { GridLayout, GridItemMain } from '@components/ui';
import { PublicationList } from '@components/publication/publication_list';

const Home: NextPage = () => {
  return (
    <GridLayout>
      <GridItemMain>
        <PublicationList type='home'/>
      </GridItemMain>
    </GridLayout>
  )
}

export default Home
