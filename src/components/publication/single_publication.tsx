import { useRouter } from 'next/router';
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
      ()=>{push(`/q/${questionId}`)}}
      >
      <div className={styles.single_publication__title}>
        <span>
        {questionTitle}
        </span>
      </div>
      <div className={styles.single_publication__header}>
        <div className={styles.single_publication__header__avatar}>
          <img src={userAvatar} alt="avatar" />
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
            <div className={styles.single_publication__content__image}>
              <img src={answerImage} alt="image" />
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