import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { GridLayout, GridItemMain } from '@ui';

const AnswerPage: NextPage = () => {
  const router = useRouter();
  const { q_id, a_id } = router.query
  const questionId = q_id as string;
  const answerId = a_id as string;

  return (
    <GridLayout>
      <GridItemMain>
        question: {questionId}, answer: {answerId}
      </GridItemMain>
    </GridLayout>
  )
}

export default AnswerPage