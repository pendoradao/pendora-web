import { Button, Modal, Textarea } from '@components/ui';
import { Question } from '@types';

interface AnswerDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  question: Question;
}

function AnswerDialog(answerDialogProps: AnswerDialogProps) {
  let { isOpen, setIsOpen, question } = answerDialogProps
  const PostAnswer = () => {
    console.log('post answer')
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={question.title} content={question.content} className="w-full lg:w-2/5">
      <div className='mt-4'>
        <Textarea rows={25} placeholder={'My opinion is ...'}/>
      </div>
      <div className='flex gap-2 mt-4'>
        <div className='grow'></div>
        <Button onClick={() => setIsOpen(false)} outline>Cancel</Button>
        <Button onClick={PostAnswer}>Post</Button>
      </div>
    </Modal>
  )
}

export default AnswerDialog