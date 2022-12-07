import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { GridLayout, GridItemMain } from '@components/ui';

const QuestionPage: NextPage = () => {
  const router = useRouter();
  const { q_id } = router.query
  const questionId = q_id as string;

  return (
    <GridLayout>
      <GridItemMain>
        question: {questionId}
      </GridItemMain>
    </GridLayout>
  )
}

export default QuestionPage