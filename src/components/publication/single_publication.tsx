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
  userAvatar,
}) => {
  const { push } = useRouter();
  const handlerGoAnswer = () => {
    push(`/q/${questionId}/a/${answerId}`);
  };
  const handlerGoQuestion = () => {
    push(`/q/${questionId}`);
  };
  const handlerGoUser = () => {
    push(`/u/${userId}`);
  };

  return (
    <div className={styles.single_publication}>
      <div className={styles.title} onClick={handlerGoQuestion} >
        <span>
        {questionTitle}
        </span>
      </div>
      <div className={styles.header} onClick={handlerGoUser} >
        <div className={styles.header__avatar}>
          <Image src={userAvatar} alt="avatar" width={48} height={48}/>
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
      <div className={styles.content} onClick={handlerGoAnswer}>
        <div className={styles.content__text}>
          <span>
            {answerContent}
          </span>
        </div>
        {
          answerImage && (
            <div className={styles.content__image} >
              <Image src={answerImage} alt="image" width={400} height={400} style={{width: '100%', height:"auto"}}/>
            </div>
          )
        }
      </div>
      {/* <div className={styles.footer}>
        <div className={styles.footer__likes}>
          <span>100 likes</span>
        </div>
        <div className={styles.footer__comments}>
          <span>100 comments</span>
        </div>
      </div> */}
    </div>
  );
};

  
export default SinglePublication;