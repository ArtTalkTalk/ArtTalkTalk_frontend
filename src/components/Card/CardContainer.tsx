import { CardType } from '@/types/cards';
import Card from './Card';
import NoContent from './NoContent';

interface Props {
  type: 'main' | 'mypage' | 'artist';
}

function CardContainer({ type }: Props) {
  const data: CardType[] = [
    // {
    //   artworkId: 1,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
    // {
    //   artworkId: 2,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
    // {
    //   artworkId: 3,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
    // {
    //   artworkId: 4,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
    // {
    //   artworkId: 5,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
    // {
    //   artworkId: 6,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
    // {
    //   artworkId: 7,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
    // {
    //   artworkId: 8,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
    // {
    //   artworkId: 9,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
    // {
    //   artworkId: 10,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
    // {
    //   artworkId: 11,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
    // {
    //   artworkId: 12,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
    // {
    //   artworkId: 13,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
    // {
    //   artworkId: 14,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
    // {
    //   artworkId: 15,
    //   title: '모의 작품 제목 1',
    //   description: '모의 작품 설명 1',
    //   artworkStatus: 'SHARE',
    //   thumbnailImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   likeCount: 1100,
    //   viewCount: 999,
    //   commentCount: 1,
    //   artistId: 1,
    //   artistName: '모의 작가 이름 1',
    //   artistProfileImageUrl:
    //     'https://images.unsplash.com/photo-1579273166152-d725a4e2b755?q=80&w=1301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   createdAt: '2024-01-29T07:21:26.100Z',
    //   updatedAt: '2024-01-29T07:21:26.100Z',
    // },
  ];

  return (
    <div
      className={`${data && data.length > 0 ? (type === 'main' ? 'card-container-mainPage' : 'card-container-artistPage') : 'flex-center mt-25 h-[55vh] w-full'}`}
    >
      {data && data.length > 0 ? (
        data.map((card) => (
          <Card
            key={card.artworkId}
            artworkId={card.artworkId}
            title={card.title}
            artworkStatus={card.artworkStatus}
            likeCount={card.likeCount}
            viewCount={card.viewCount}
            commentCount={card.commentCount}
            thumbnailImageUrl={card.thumbnailImageUrl}
            artistId={card.artistId}
            artistName={card.artistName}
            artistProfileImageUrl={card.artistProfileImageUrl}
            type={type}
          />
        ))
      ) : (
        <NoContent />
      )}
    </div>
  );
}

export default CardContainer;
