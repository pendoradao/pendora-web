import { useRouter } from 'next/router';
import Image from 'next/image';
import { FC, useState } from 'react';
import clsx from 'clsx';
import { HeartIcon, ChatAltIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';

import { Avatar, Tooltip } from '@components/ui';
import { Post, Comment, Profile } from '@generated/types';
import { getIPFSLink } from '@lib/ipfs';
import styles from '@/styles/publication.module.css';

interface PublicationContext {
  showQuestion?: boolean;
  clickAble?: boolean;
}

const Actions = () => {
  const [liked, setLiked] = useState(0);

  return (
    <div className={styles.footer}>
    <span className="flex items-center justify-center space-x-1">
      <span className="p-1.5 rounded-full hover:bg-zinc-300 hover:bg-opacity-20">
        <Tooltip placement="top" content={liked ? 'Unlike' : 'Like'} withDelay>
          {liked ? <HeartIconSolid className="w-[17px] sm:w-[20px]" /> : <HeartIcon className="w-[17px] sm:w-[20px]" />}
        </Tooltip>
      </span>
      <span className="text-[11px] sm:text-xs">12.5</span>
    </span>
    <span className="flex items-center justify-center space-x-1">
      <span className="p-1.5 rounded-full hover:bg-zinc-300 hover:bg-opacity-20">
        <Tooltip placement="top" content='comment' withDelay>
          <ChatAltIcon className="w-[17px] sm:w-[20px]" />
        </Tooltip>
      </span>
      <span className="text-[11px] sm:text-xs">5</span>
    </span>
  </div>
  )
}

const ProfileArea: FC<Profile> = ({id, handle, picture, name}) => {
  const { push } = useRouter();
  const handlerGoUser = () => {
    push(`/u/${id}`);
  };
  // @ts-ignore
  const avatarUrl= getIPFSLink(picture?.original?.url || '');

  return (
    <div className={styles.header} onClick={handlerGoUser} >
      <Avatar avatarUrl={avatarUrl} className='mr-4'/>
      <div className={styles.header__info}>
        <div className={styles.header__info__name}>
          <span>{name || handle}</span>
        </div>
        <div className={styles.header__info__date}>
          <span>@{handle}</span>
        </div>
      </div>
    </div>
  )
}

export const SingleAnswer: FC<Comment & PublicationContext> = ({ 
  id, 
  metadata, 
  profile,
  clickAble
}) => {
  return (
    <>
      <ProfileArea {...profile} />
      <div className={clsx(styles.content, clickAble ? 'cursor-pointer': '')}>
        <div className={styles.content__text}>
          <span>
            {metadata?.content}
          </span>
        </div>
        {/* {
          answerImage && (
            <div className={styles.content__image} >
              <Image src={answerImage} alt="image" width={400} height={400} style={{ width: '100%', height: "auto" }} />
            </div>
          )
        } */}
      </div>
      <Actions />
    </>
  )
}


export const SinglePublication: FC<{question?: Post} & PublicationContext & {comment?: Comment}> = ({
  question,
  comment,
  showQuestion,
  clickAble
}) => {
  const { push } = useRouter();
  const handlerGoQuestion = () => {
    push(`/q/${question?.id}`);
  };

  const [liked, setLiked] = useState(0);

  return (
    <div className={styles.single_publication}>
      {showQuestion && question?.id && (
        <div className={styles.title} onClick={handlerGoQuestion} >
          <span>
            {question.metadata.content}
          </span>
        </div>
      )}
      {
        comment?.id && (
          <SingleAnswer {...comment} clickAble={clickAble} />
        )
      }


    </div>
  );
};