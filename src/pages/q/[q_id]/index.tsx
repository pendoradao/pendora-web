import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { GridLayout, GridItemMain } from '@components/ui';
import { AnswerList } from '@components/publication/answer_list';

const QuestionPage: NextPage = () => {
  const router = useRouter();
  const { q_id } = router.query
  const questionId = q_id as string;

  return (
    <GridLayout>
      <GridItemMain>
        <AnswerList questionId={questionId} />
      </GridItemMain>
    </GridLayout>
  )
}

export default QuestionPage