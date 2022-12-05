import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { GridLayout, GridItemMain } from '@ui';
import QuestionCard from '@components/publication/question_card';


const EditAnswerPage: NextPage = () => {
  const { query } = useRouter();
  const questionId = query.q_id as string;

  return (
    <GridLayout>
      <GridItemMain>
        <QuestionCard id={1} title={"what?"} content={"How can this work?"} profileId={"0x01"}></QuestionCard>
        <div>
          Edit Answer for {questionId}
          <textarea />
        </div>
      </GridItemMain>
    </GridLayout>
  );
};

export default EditAnswerPage