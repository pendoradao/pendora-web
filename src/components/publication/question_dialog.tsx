import { useEffect, useContext } from 'react';
import { object, string } from 'zod';
import { useSignTypedData } from 'wagmi';
import { splitSignature } from 'ethers/lib/utils';

import { 
  useCreatePostTypedDataMutation 
} from '@generated/types';
import { Button, Modal, Textarea, Input, Form, useZodForm } from '@components/ui';
import { useAppPersistStore } from '@store/app';
import { ContractContext } from '@context/contract';
import { getTypedData } from '@lib/eth';

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
  const { lensHub } = useContext(ContractContext)
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

  const handleSignTypedData = async (data: any) => {
    var { typedData } = data.createPostTypedData;
    getTypedData(typedData);
    console.log('create post: typedData', typedData);
    await signTypedData({
      domain: typedData.domain,
      types: typedData.types,
      value: {
        profileId: typedData.value.profileId,
        deadline: typedData.value.deadline,
        nonce: typedData.value.nonce,
        collectModule: typedData.value.collectModule,
        referenceModule: typedData.value.referenceModule,
        contentURI: typedData.value.contentURI,
        collectModuleInitData: typedData.value.collectModuleInitData,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
      }
    });
  }
  
  const handleCreatePost = async (signature: any, data: any) => {
    console.log('create post: signature', signature);
    if (lensHub) {
      var { typedData } = data.createPostTypedData
      const { v, r, s } = splitSignature(signature);
      const tx = await lensHub.postWithSig({
        profileId: typedData.value.profileId,
        contentURI: typedData.value.contentURI,
        collectModule: typedData.value.collectModule,
        collectModuleInitData: typedData.value.collectModuleInitData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      });
    }
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
      handleCreatePost(signature, data)
    }
  }, [signature, data])

  const onSubmit = (value: QuestionFormProps) => {
    console.log(value)
    const contentURI = 'ipfs://Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz'
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