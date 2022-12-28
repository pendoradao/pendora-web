import { Post } from '@generated/types';

const QuestionCard = (question: Post) => {
  const { metadata } = question;

  return (
    <div className='mb-8'>
      <div className='text-2xl font-semibold'>
        <h1>{metadata.content}</h1>
      </div>
      <div className='mt-4'>
        <span>{metadata.description}</span>
      </div>
    </div>
  );
}

export default QuestionCard;