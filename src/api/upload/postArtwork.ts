import { PostCardRequestType } from '@/types/cards';
import { AxiosError } from 'axios';
import instance from '../axios';

export const postArtwork = async ({ imageIds, title, description, artworkStatus }: PostCardRequestType) => {
  try {
    const response = await instance.post(
      '/artworks',
      {
        imageIds,
        title,
        description,
        artworkStatus,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (err: unknown) {
    const error = err as AxiosError;
    return error.response;
  }
};
