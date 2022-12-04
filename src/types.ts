export interface Question {
  id: number;
  title: string;
  content: string;
  profileId: string;
}

export interface Answer {
  id: number;
  content: string;
  image?: string;
  questionId: number;
  profileId: string;
}

export interface Post {
  questionId: number;
  questionTitle: string;
  answerId: number;
  answerContent: string;
  answerImage?: string;
  profileId: string;
  userName: string;
  userAvatar: string;
}

export interface Profile {
  id: string;
  name: string;
  bio: string;
  handle: string;
  avatarUrl: string;
}

export interface Publication {
  id: number;
  metadata: {
    content: string;
  }
}