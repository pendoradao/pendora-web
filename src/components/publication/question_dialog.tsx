import { useState } from 'react';
import { object, string } from 'zod';

import { Button, Modal, Textarea, Input, Form, useZodForm } from '@components/ui';

interface QuestionFormProps {
  title: string;
  content?: string;
}

const questionSchema = object({
  title: string()
    .min(1, { message: 'Question can\'t be empty' }),
  content: string()
});

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const QuestionDialog = ({open, setOpen}: DialogProps) => {
  // const [open, setOpen] = useState(true);
  const form = useZodForm({
    schema: questionSchema
  });

  const onSubmit = (value: QuestionFormProps) => {
    console.log(value)
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Ask a question" className="w-full lg:w-2/5">
      <Form form={form} onSubmit={onSubmit}>
        <div className='mt-4'>
          <Input placeholder={'My question is ...'} {...form.register('title')}/>
          <Textarea rows={8} placeholder={'More detail'} {...form.register('content')} className='mt-4'/>
        </div>
        <div className='flex gap-2 mt-4'>
          <div className='grow'></div>
          <Button onClick={() => setOpen(false)} outline>Cancel</Button>
          <Button type="submit">Post</Button>
        </div>
      </Form>
    </Modal>
  )
}

export default QuestionDialog