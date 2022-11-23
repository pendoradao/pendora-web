import { useRouter } from 'next/router';
import Image from 'next/image';
import type { FC } from 'react';

import { Question, User, Post } from '@types';
import styles from '@/styles/publication.module.css';


const SinglePublication: FC<Post> = ({
  questionId,
  questionTitle,
  answerId,
  answerContent,
  answerImage,
  userId,
  userName,
  userAvatar
}) => {
  const { push } = useRouter();
  return (
    <div className={styles.single_publication} onClick={
      ()=>{push(`/q/${questionId}/a/${answerId}`)}} >
      <div className={styles.single_publication__title}>
        <span>
        {questionTitle}
        </span>
      </div>
      <div className={styles.single_publication__header}>
        <div className={styles.single_publication__header__avatar}>
          <Image src={userAvatar} alt="avatar" width={48} height={48}/>
        </div>
        <div className={styles.single_publication__header__info}>
          <div className={styles.single_publication__header__info__name}>
            <span>{userName}</span>
          </div>
          <div className={styles.single_publication__header__info__date}>
            <span>@0xzelda.lens</span>
          </div>
        </div>
      </div>
      <div className={styles.single_publication__content}>
        <div className={styles.single_publication__content__text}>
          <span>
            {answerContent}
          </span>
        </div>
        {
          answerImage && (
            <div className={styles.single_publication__content__image} >
              <Image src={answerImage} alt="image" width={400} height={400} style={{width: '100%', height:"auto"}}/>
            </div>
          )
        }
      </div>
      <div className={styles.single_publication__footer}>
        <div className={styles.single_publication__footer__likes}>
          <span>100 likes</span>
        </div>
        <div className={styles.single_publication__footer__comments}>
          <span>100 comments</span>
        </div>
      </div>
    </div>
  );
};

  
export default SinglePublication;