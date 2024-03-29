import { CardType } from './cards';

export interface UserType {
  userId: number;
  userRole: 'ASSOCIATE' | 'REGULAR';
  nickname: string;
  activityField: string;
  activityArea: string;
  description: string;
  profileImageUrl: string;
  totalLikeCount: number;
  followerCount: number;
  links: GetUserLinks[];
  followId: number;
}

export interface GetMyInfo {
  userId: number;
  userRole: 'ASSOCIATE' | 'REGULAR';
}

export interface PutRequestSignUp {
  profileImageUrl: string;
  nickname: string;
  activityArea: string;
  activityField: string;
  description: string;
}

export interface PutRequestUserProfile extends PutRequestSignUp {}

export interface PutResponseSignup {
  userId: number;
  role: 'ASSOCIATE' | 'REGULAR';
  accessToken: string;
  refreshToken: string;
}

export interface GetUserLinks {
  linkId: number;
  title: string;
  url: string;
}

export interface PostUserLinks {
  title: string;
  url: string;
}

// userLink 삭제는 userId, linkId 를 query로 요청

export interface PostSignUpRequestType {
  nickname: string;
  activityField: string;
  activityArea: string;
  description: string;
  profileImageUrl: string;
}

export interface PostSignUpResPonseType extends UserType {}

export interface PutUserInfoRequestType {
  nickname: string;
  activityField: string;
  activityArea: string;
  description: string;
  profileImageUrl: string;
}

export interface PutUserInfoResponseType extends UserType {}

export interface DeleteUserInfoRequestType {}

export interface GetMyPageResponseType {
  userProfileResponse: UserType;
  artworkResponsePageResponse: {
    contents: CardType[];
  };
}
