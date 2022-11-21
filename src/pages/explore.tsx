import type { NextPage } from 'next'

import { GridLayout, GridItemMain } from '@ui';
import { PublicationList } from '@components/publication/publication_list';


const Explore: NextPage = () => {
  return (
    <GridLayout>
      <GridItemMain>
        <PublicationList type='explore' />
      </GridItemMain>
    </GridLayout>
  )
}

export default Explore
