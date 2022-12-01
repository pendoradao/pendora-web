import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { GridLayout, GridItemMain } from '@ui';

const UserPage: NextPage = () => {
  const router = useRouter();
  const { u_id } = router.query
  const userId = u_id as string

  return (
    <GridLayout>
      <GridItemMain>
        user: {userId}
      </GridItemMain>
    </GridLayout>
  )
}

export default UserPage