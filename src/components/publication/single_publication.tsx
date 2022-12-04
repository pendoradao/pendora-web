import { useRouter } from 'next/router';
import Image from 'next/image';
import { FC, useState } from 'react';
import clsx from 'clsx';
import { HeartIcon, ChatAltIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid';

import { Tooltip } from '@ui';
import { Question, Profile, Post } from '@types';
import styles from '@/styles/publication.module.css';

interface PostContext {
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


const SinglePublication: FC<Post & PostContext> = ({
  questionId,
  questionTitle,
  answerId,
  answerContent,
  answerImage,
  profileId,
  userName,
  userAvatar,
  showQuestion,
  clickAble
}) => {
  const { push } = useRouter();
  const handlerGoAnswer = () => {
    clickAble && push(`/q/${questionId}/a/${answerId}`);
  };
  const handlerGoQuestion = () => {
    push(`/q/${questionId}`);
  };
  const handlerGoUser = () => {
    push(`/u/${profileId}`);
  };

  const [liked, setLiked] = useState(0);

  return (
    <div className={styles.single_publication}>
      {showQuestion && questionId && (
        <div className={styles.title} onClick={handlerGoAnswer} >
          <span>
            {questionTitle}
          </span>
        </div>
      )}
      <div className={styles.header} onClick={handlerGoUser} >
        <div className={styles.header__avatar}>
          <Image src={userAvatar} alt="avatar" width={48} height={48} />
        </div>
        <div className={styles.header__info}>
          <div className={styles.header__info__name}>
            <span>{userName}</span>
          </div>
          <div className={styles.header__info__date}>
            <span>@0xzelda.lens</span>
          </div>
        </div>
      </div>
      <div className={clsx(styles.content, clickAble ? 'cursor-pointer': '')} onClick={handlerGoAnswer}>
        <div className={styles.content__text}>
          <span>
            {answerContent}
          </span>
        </div>
        {
          answerImage && (
            <div className={styles.content__image} >
              <Image src={answerImage} alt="image" width={400} height={400} style={{ width: '100%', height: "auto" }} />
            </div>
          )
        }
      </div>
      <Actions />
    </div>
  );
};


export default SinglePublication;