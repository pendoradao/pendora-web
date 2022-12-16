import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useAccount } from 'wagmi';
import { object, string } from 'zod';

import { CreateProfileDocument } from '@generated/types';
import { Form, useZodForm, Button, Spinner, Message, Input, ChooseFile } from '@components/ui';
import { APP_NAME, HANDLE_REGEX } from '@constants';
import Pending from './pending';

const newUserSchema = object({
  handle: string()
    .min(2, { message: 'Handle should be at least 2 characters' })
    .max(31, { message: 'Handle should be less than 32 characters' })
    .regex(HANDLE_REGEX, {
      message: 'Handle should only contain alphanumeric characters'
    })
});

const uploadToIPFS = async (any: any) => {
  console.log(any);
}

const NewProfile = () => {
  const [avatar, setAvatar] = useState('');
  const [uploading, setUploading] = useState(false);
  const { address } = useAccount();
  const [createProfile, { data, loading, error }] = useMutation(CreateProfileDocument);

  const form = useZodForm({
    schema: newUserSchema
  });

  const handleUpload = async (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setUploading(true);
    try {
      const attachment = await uploadToIPFS(evt.target.files);
      // if (attachment[0]?.item) {
      //   setAvatar(attachment[0].item);
      // }
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (error) {
      console.error(error);
      form.setError('handle', {
        type: 'manual',
        message: error.message
      });
    }
  }, [error]);


  return data?.createProfile.__typename === 'RelayerResult' && data?.createProfile.txHash ? (
    <Pending handle={form.getValues('handle')} txHash={data?.createProfile?.txHash} />
  ) : (
    <Form
      form={form}
      className="space-y-4"
      onSubmit={({ handle }) => {
        const username = handle.toLowerCase();
        createProfile({
          variables: {
            request: {
              handle: username,
              profilePictureUri: avatar ? avatar : `https://avatar.tobi.sh/${address}_${username}.png`
            }
          }
        });
      }}
    >
      {data?.createProfile?.reason && (
        <Message
          className="mb-3"
          title="Create profile failed!"
          content={data?.createProfile?.reason}
        />
      )}

      <div className="mb-2 space-y-4">
        {/* <img className="w-10 h-10" height={40} width={40} src="/logo.svg" alt="Logo" /> */}
        <div className="text-xl font-bold">Signup to {APP_NAME}</div>
      </div>

      <Input required label="Handle" type="text" placeholder="who" {...form.register('handle')} className="after:content-['*']" />
      <div className="space-y-1.5">
        <div className="label">Avatar</div>
        <div className="space-y-3">
          {avatar && (
            <div>
              <img className="w-60 h-60 rounded-lg" height={240} width={240} src={avatar} alt={avatar} />
            </div>
          )}
          <div>
            <div className="flex items-center space-x-3">
              <ChooseFile onChange={(evt: ChangeEvent<HTMLInputElement>) => handleUpload(evt)} />
              {uploading && <Spinner size="sm" />}
            </div>
          </div>
        </div>
      </div>
      <Button
        className="ml-auto"
        type="submit"
        loading={loading}
      >
        Signup
      </Button>
    </Form>
  );
};

export default NewProfile;
