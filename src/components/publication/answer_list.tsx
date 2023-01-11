import { useState, useEffect } from 'react'
import { PencilIcon } from '@heroicons/react/solid';

import { Post, Comment, usePublicationQuery, useCommentFeedQuery } from '@generated/types';
import { Button, Spinner } from '@components/ui';
import AnswerDialog from '@components/publication/answer_dialog';
import { useAppPersistStore } from '@store/app';
import { SinglePublication } from './single_publication';
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
  const [data, setData] = useState([] as Comment[])
  const [question, setQuestion] = useState({} as Post)
  const [open, setOpen] = useState(false)

  const { data: publiction, loading, error } = usePublicationQuery({
    variables: {
      request: {
        publicationId: questionId,
      }
    },
  });

  const { data: answerData, loading: answerLoading, error: answerError } = useCommentFeedQuery({
    variables: {
      request: {
        commentsOf: questionId,
      }
    },
  });

  useEffect(() => {
    if (publiction && publiction?.publication) {
      // console.log(publiction)
      // @ts-ignore
      setQuestion(publiction?.publication)
    }
  }, [publiction])

  useEffect(() => {
    if (answerData && answerData?.publications) {
      // console.log(answerData)
      // @ts-ignore
      setData(answerData?.publications?.items)
    }
  }, [answerData])


  const handleAnswer = () => {
    if (currentUser) {
      setOpen(true)
    } else {
      startLogin();
    }
  }

  const handlerRefresh = () => {
    console.log('refresh')
  }

  return (
    <div>
      <div>
        {
          question?.id ? (
            <>
              <QuestionCard {...question} />
              <div className='flex'>
                <Button icon={<PencilIcon/>} variant="primary" onClick={handleAnswer}> Answer</Button>
                <AnswerDialog open={open} setOpen={setOpen} question={question} handlerRefresh={handlerRefresh}/>
              </div>
            </>
          ) : <></>
        }
      </div>
      {(loading || answerLoading) && <Spinner size='lg' className='mx-auto'/>}
      {
        data ? 
          data?.map((comment: Comment) => <SinglePublication key={comment.id} comment={comment} clickAble={false}/>) : 
          null
      }
    </div>
  );
};