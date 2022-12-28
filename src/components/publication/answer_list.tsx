import { useState, useEffect } from 'react'
import { PencilIcon } from '@heroicons/react/solid';

import { Post, usePublicationQuery } from '@generated/types';
import { Button } from '@components/ui';
import AnswerDialog from '@components/publication/answer_dialog';
import { useAppPersistStore } from '@store/app';
import SinglePublication from './single_publication';
import QuestionCard from './question_card';
import { useLogin } from '@lib/login';

interface AnswerListProps {
  questionId: string;
  answerId?: string;
}

export const AnswerList = (answerListProps: AnswerListProps) => {
  const currentUser = useAppPersistStore(state => state.currentUser);
  const { startLogin } = useLogin();
  const { questionId, answerId } = answerListProps;
  const [data, setData] = useState([])
  const [question, setQuestion] = useState({} as Post)
  const [isLoading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const { data: publiction, loading, error } = usePublicationQuery({
    variables: {
      //  request: // value for 'request'
      //  reactionRequest: // value for 'reactionRequest'
      //  profileId: // value for 'profileId'
      request: {
        publicationId: questionId,
      }
    },
  });

  useEffect(() => {
    if (publiction && publiction?.publication) {
      console.log(publiction)
      setQuestion(publiction?.publication)
    }
  }, [publiction])


  const handleAnswer = () => {
    if (currentUser) {
      setOpen(true)
    } else {
      startLogin();
    }
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <div>
        {
          question?.id ? (
            <>
              <QuestionCard {...question} />
              <div className='flex'>
                <Button icon={<PencilIcon/>} variant="primary" onClick={handleAnswer}> Answer</Button>
                <AnswerDialog open={open} setOpen={setOpen} question={question}/>
              </div>
            </>
          ) : <></>
        }
      </div>
      {
        data ? data?.map((post: Post) => <SinglePublication key={post.id} {...post} showQuestion={false} clickAble={false} />) : null
      }
    </div>
  );
};