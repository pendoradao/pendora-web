import { useEffect } from 'react';
import { object, string } from 'zod';
import { useSignTypedData } from 'wagmi';

import { Button, Modal, Textarea, Form, useZodForm } from '@components/ui';
import { Post, useCreateCommentTypedDataMutation, CreatePublicCommentRequest } from '@generated/types';
import { cleanTypedData } from '@lib/eth';
import { getUploadToIPFSLink } from '@lib/ipfs';
import { useAppPersistStore } from '@store/app';
import { getMetadata, useCommentWithSig } from '@lib/publication';

interface AnswerFormProps {
  content: string;
}

const answerSchema = object({
  content: string()
    .min(1, { message: 'Answer can\'t be empty' })
});

interface AnswerDialogProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  question: Post;
  handlerRefresh: () => void;
}

function AnswerDialog(answerDialogProps: AnswerDialogProps) {
  const currentUser = useAppPersistStore(state => state.currentUser);
  const [createCommentTypedDataMutation,  { data, loading, error }] = useCreateCommentTypedDataMutation({
    onError: (error) => {
      console.error(error);
    }
  });
  const { data: signature, isError, isLoading, isSuccess, status, signTypedData } = useSignTypedData({ 
    onError(error) {
      console.error(error?.message);
    },
  })
  const { commentWithSig } = useCommentWithSig();
  const form = useZodForm({
    schema: answerSchema
  });
  const { open, setOpen, question, handlerRefresh } = answerDialogProps

  const handleSignTypedData = async (data: any) => {
    var { typedData } = data.createCommentTypedData;
    cleanTypedData(typedData);
    console.log('create post: typedData', typedData);
    await signTypedData({
      domain: typedData.domain,
      types: typedData.types,
      value: typedData.value
    });
  }

  useEffect(() => {
    if (data) {
      handleSignTypedData(data)
    } else if (error) {
      console.log(error)
    }
  }, [data, error, loading]);

  useEffect(() => {
    if (signature && data) {
      commentWithSig(signature, data)
      setOpen(false)
      handlerRefresh()
    }
  }, [signature, data])

  const onSubmit = async (value: AnswerFormProps) => {
    if (currentUser) {
      const metaData = getMetadata({
        content: value.content,
        type: 'answer',
        name: `${currentUser.name}'s answer`,
      });
      const contentURI = await getUploadToIPFSLink(metaData);
      if (contentURI) {
        const CreatePublicCommentRequest = {
          publicationId: question.id,
          profileId: currentUser?.id,
          contentURI: contentURI,
          collectModule: {
            freeCollectModule: { followerOnly: true },
          },
          referenceModule: {
            followerOnlyReferenceModule: false,
          },
        };
        await createCommentTypedDataMutation({variables: {request: CreatePublicCommentRequest}});
      } else {
        console.error('Upload to IPFS failed')
      }
    } else {
      console.error('User not logined')
    }
  }

  return (
    <Modal open={open} setOpen={setOpen} title={question.metadata.content} content={question.metadata.description} className="w-full lg:w-2/5">
      <Form form={form} onSubmit={onSubmit}>
        <div className='mt-4'>
          <Textarea rows={25} placeholder={'My opinion is ...'}  {...form.register('content')}/>
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

export default AnswerDialog