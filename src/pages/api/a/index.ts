import type { NextApiRequest, NextApiResponse } from 'next'
import { Question, Answer, Post } from '@types';

type Data = {
  meta: {
    total: number;
  };
  question: Question;
  data: Post[]
}

//update the cache
var r = Math.random().toString(36).substring(7);

const testData = {
  meta: {
    total: 2,
  },
  question: {
    id: 1,
    title: 'How to use Next.js?',
    content: 'How to use Next.js',
    profileId: '0x01',
  },
  data: [
    {
      questionId: 1,
      questionTitle: 'How to use Next.js?',
      answerId: 1,
      answerContent: 'You can use Next.js by creating a Next.js app.',
      answerImage: 'https://picsum.photos/400?t=1&r='+r,
      profileId: '0x01',
      userName: 'John Doe',
      userAvatar: 'https://picsum.photos/200?t=1&r='+r,
    },
    {
      questionId: 2,
      questionTitle: 'How to use React?',
      answerId: 2,
      answerContent: 'You can use React by creating a React app.',
      profileId: '0x02',
      userName: 'Matt Chen',
      userAvatar: 'https://picsum.photos/200?t=2&r='+r,
    },
    {
      questionId: 3,
      questionTitle: 'How to use TypeScript?',
      answerId: 3,
      answerContent: 'You can use TypeScript by creating a TypeScript app.',
      answerImage: 'https://picsum.photos/400?t=3&r='+r,
      profileId: '0x03',
      userName: 'John Smith',
      userAvatar: 'https://picsum.photos/200?t=3&r='+r,
    },
    {
      questionId: 4,
      questionTitle: 'How to use GraphQL?',
      answerId: 4,
      answerContent: 'You can use GraphQL by creating a GraphQL app.',
      profileId: '0x04',
      userName: 'Zrui Wang',
      userAvatar: 'https://picsum.photos/200?t=4&r='+r,
    },
    {
      questionId: 5,
      questionTitle: 'How to use Apollo?',
      answerId: 5,
      answerContent: 'You can use Apollo by creating a Apollo app.',
      profileId: '0x05',
      userName: 'Sarah Connor',
      userAvatar: 'https://picsum.photos/200?t=5&r='+r,
    },
    {
      questionId: 6,
      questionTitle: 'How to use Prisma?',
      answerId: 6,
      answerContent: 'You can use Prisma by creating a Prisma app.',
      profileId: '0x06',
      userName: 'Chris Zhang',
      userAvatar: 'https://picsum.photos/200?t=6&r='+r,
    }
  ]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(testData)
}
