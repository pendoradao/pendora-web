import { useState, useEffect } from 'react'
import { PencilIcon } from '@heroicons/react/solid';

import { Question, Post } from '@types';
import { Button } from '@components/ui';
import AnswerDialog from '@components/publication/answer_dialog';
import { useAppPersistStore } from '@store/app';
import SinglePublication from './single_publication';
import QuestionCard from './question_card';
import { useLogin } from '@lib/login';

interface AnswerListProps {
  questionId: number;
  answerId?: number;
}

export const AnswerList = (answerListProps: AnswerListProps) => {
  const currentUser = useAppPersistStore(state => state.currentUser);
  const { startLogin } = useLogin();
  const { questionId, answerId } = answerListProps;
  const [data, setData] = useState([])
  const [question, setQuestion] = useState({} as Question)
  const [isLoading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    const url = answerId ? `/api/a?questionId=${questionId}&answerId=${answerId}` : `/api/a?questionId=${questionId}`
    setLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
        setQuestion(data.question)
        setLoading(false)
      })
  }, [answerId, questionId])

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
        data ? data?.map((post: Post) => <SinglePublication key={post.answerId} {...post} showQuestion={false} clickAble={false} />) : null
      }
    </div>
  );
};