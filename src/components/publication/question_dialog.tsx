import { useEffect } from 'react';
import { object, string } from 'zod';
import { useSignTypedData } from 'wagmi';

import { cleanTypedData } from '@lib/eth';
import { getUploadToIPFSLink } from '@lib/ipfs';
import { 
  useCreatePostTypedDataMutation 
} from '@generated/types';
import { Button, Modal, Textarea, Input, Form, useZodForm } from '@components/ui';
import { useAppPersistStore } from '@store/app';
import { getMetadata, usePostWithSig } from '@lib/publication';

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
  const currentUser = useAppPersistStore(state => state.currentUser);
  const [createPostTypedDataMutation,  { data, loading, error }] = useCreatePostTypedDataMutation({
    onError: (error) => {
      console.error(error);
    }
  });
  const { data: signature, isError, isLoading, isSuccess, status, signTypedData } = useSignTypedData({ 
    onError(error) {
      console.error(error?.message);
    },
  })
  const { postWithSig } = usePostWithSig();

  const handleSignTypedData = async (data: any) => {
    var { typedData } = data.createPostTypedData;
    cleanTypedData(typedData);
    console.log('create post: typedData', typedData);
    await signTypedData({
      domain: typedData.domain,
      types: typedData.types,
      value: typedData.value
    });
  }

  const form = useZodForm({
    schema: questionSchema
  });

  useEffect(() => {
    if (data) {
      handleSignTypedData(data)
    } else if (error) {
      console.log(error)
    }
  }, [data, error, loading]);

  useEffect(() => {
    if (signature && data) {
      postWithSig(signature, data)
      setOpen(false)
    }
  }, [signature, data])

  const onSubmit = async (value: QuestionFormProps) => {
    if (currentUser) {
      const metaData = getMetadata({
        content: value.title,
        description: value.content || '',
        type: 'question',
        name: `${currentUser.name}'s question`,
      });
      const contentURI = await getUploadToIPFSLink(metaData);
      const createPostRequest = {
        profileId: currentUser?.id,
        contentURI: contentURI,
        collectModule: {
          freeCollectModule: { followerOnly: true },
        },
        referenceModule: {
          followerOnlyReferenceModule: false,
        },
      };
      createPostTypedDataMutation({variables: {request: createPostRequest}});
    } else {
      console.error('User not logined')
    }
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