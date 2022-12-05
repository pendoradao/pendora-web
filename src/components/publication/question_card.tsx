import { Question, Post } from '@types';

const QuestionCard = (questionCardProps: Question) => {
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

export default QuestionCard;