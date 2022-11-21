export interface Question {
  id: number;
  title: string;
  content: string;
  userId: number;
}

export interface Answer {
  id: number;
  content: string;
  image?: string;
  questionId: number;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface Post {
  questionId: number;
  questionTitle: string;
  answerId: number;
  answerContent: string;
  answerImage?: string;
  userId: number;
  userName: string;
  userAvatar: string;
}