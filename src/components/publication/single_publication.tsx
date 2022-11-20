import type { FC } from 'react';

import styles from '@/styles/publication.module.css';

interface Question {
  id: number;
  title: string;
  content: string;
}

interface User {
  id: number;
  name: string;
  avatar: string;
}

interface Props {
  showQuestion?: boolean;
  showQuestionDetails?: boolean;
  question?: Question;
  author?: User;
}

const SinglePublication: FC<Props> = ({
  showQuestion,
  showQuestionDetails,
  question,
  author
}) => {
  return (
    <div className={styles.single_publication}>
      <div className={styles.single_publication__title}>
        <span>
        How could I make a simple website with Next.js and Tailwind CSS?
        </span>
      </div>
      <div className={styles.single_publication__header}>
        <div className={styles.single_publication__header__avatar}>
          <img src="https://picsum.photos/200" alt="avatar" />
        </div>
        <div className={styles.single_publication__header__info}>
          <div className={styles.single_publication__header__info__name}>
            <span>John Doe</span>
          </div>
          <div className={styles.single_publication__header__info__date}>
            <span>@0xzelda.lens</span>
          </div>
        </div>
      </div>
      <div className={styles.single_publication__content}>
        <div className={styles.single_publication__content__text}>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, quod, quia, voluptatibus quae voluptatem quibusdam
            voluptatum quos quidem natus quas. Quisquam, quae. Quisquam, quae.
            Quisquam, quae. Quisquam, quae. Quisquam, quae. Quisquam, quae.
            </span>
        </div>
        <div className={styles.single_publication__content__image}>
          <img src="https://picsum.photos/400" alt="image" />
        </div>
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