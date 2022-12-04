import { useState, useEffect } from 'react'

import SinglePublication from './single_publication';
import { Question, Post } from '@types';

interface AnswerListProps {
  questionId: number;
  answerId?: number;
}

// interface QuestionCard {
//   id: number;
//   title: string;
//   content: string;
//   userId: number;
// }

const QuestionCard =  (questionCardProps: Question) => {
  const { id, title, content } = questionCardProps;
  return (
    <div className='mb-8'>
      <div className='text-2xl font-semibold'>
        <h1>{title}</h1>
      </div>
      <div className='mt-4'>
        <span>{content}</span>
      </div>
    </div>
  );
}

export const AnswerList = (answerListProps: AnswerListProps) => {
  const { questionId, answerId } = answerListProps;
  const [data, setData] = useState([])
  const [question, setQuestion] = useState({} as Question)
  const [isLoading, setLoading] = useState(false)
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
          question?.id ? <QuestionCard {...question} /> : <></>
        }
      </div>
      {
        data ? data?.map((post: Post) => <SinglePublication key={post.answerId} {...post} showQuestion={false} clickAble={false}/>) : null
      }
    </div>
  );
};