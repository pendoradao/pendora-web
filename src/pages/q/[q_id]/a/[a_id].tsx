import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { GridLayout, GridItemMain } from '@components/ui';
import { AnswerList } from '@components/publication/answer_list';

const AnswerPage: NextPage = () => {
  const router = useRouter();
  const { q_id, a_id } = router.query
  const questionId = parseInt(q_id as string);
  const answerId = parseInt(a_id as string);

  return (
    <GridLayout>
      <GridItemMain>
        <AnswerList questionId={questionId} answerId={answerId} />
      </GridItemMain>
    </GridLayout>
  )
}

export default AnswerPage