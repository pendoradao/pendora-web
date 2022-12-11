import { useState, useEffect } from 'react'
import { PencilIcon } from '@heroicons/react/solid';

import { Question, Post } from '@types';
import { Button } from '@components/ui';
import AnswerDialog from '@components/answer_dialog';
import SinglePublication from './single_publication';
import QuestionCard from './question_card';

interface AnswerListProps {
  questionId: number;
  answerId?: number;
}

export const AnswerList = (answerListProps: AnswerListProps) => {
  const { questionId, answerId } = answerListProps;
  const [data, setData] = useState([])
  const [question, setQuestion] = useState({} as Question)
  const [isLoading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const url = answerId ? `/api/a?questionId=${questionId}&answerId=${answerId}` : `/api/a?questionId=${questionId}`

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
        setQuestion(data.question)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <div>
        {
          question?.id ? (
            <>
              <QuestionCard {...question} />
              <div className='flex'>
                <Button icon={<PencilIcon/>} outline onClick={()=>setOpen(true)}> Answer</Button>
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