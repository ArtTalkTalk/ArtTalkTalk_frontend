'use client';

import { getArtistArtworks } from '@/api/artworks/getArtistArtworks';
import { getArtworks } from '@/api/artworks/getArtworks';
import { getFollowingArtworks } from '@/api/artworks/getFollowingArtworks';
import { getSearchArtworks } from '@/api/artworks/getSearchArtworks';
import { getMyArtworks } from '@/api/users/getMyArtworks';
import ArtModal from '@/app/(root-modal)/ArtModal/ArtModal';
import AskForDeleteModal from '@/app/(root-modal)/AskForDeleteModal/AskForDeleteModal';
import EditUploadModal from '@/app/(root-modal)/EditUploadModal/EditUploadModal';
import useInfiniteData from '@/hooks/useInfiniteData';
import { useStore } from '@/store';
import { CardType } from '@/types/cards';
import { useParams, usePathname } from 'next/navigation';
import { useRef } from 'react';
import Card from './Card';
import NoContent from './NoContent';

interface Props {
  type: 'main' | 'mypage' | 'artist' | 'comment' | 'search';
  categoryType: '전체' | 'following' | '판매중' | '컬렉션';
}

interface ArtWorks {
  contents: CardType[];
  hasNext: boolean;
  pages: ArtWorks[];
}

function CardContainer({ type, categoryType }: Props) {
  const bottom = useRef<HTMLDivElement>(null);
  const params = useParams<{ id: string; searchWord: string }>();
  const modals = useStore((state) => state.modals);
  const pathname = usePathname();

  const infiniteQueryArguments = {
    allArtworks: {
      queryKey: ['allArtworks'],
      queryFn: getArtworks,
      initialPageParam: null,
      getNextPageParam: (lastPage: ArtWorks) => {
        return lastPage?.hasNext ? lastPage.contents[lastPage.contents.length - 1].artworkId : undefined;
      },
      ref: bottom,
      type: type,
      enabled: type === 'main' && categoryType === '전체',
    },
    allFollowingArtworks: {
      queryKey: ['allFollowingArtworks'],
      queryFn: getFollowingArtworks,
      initialPageParam: null,
      getNextPageParam: (lastPage: ArtWorks) => {
        return lastPage?.hasNext ? lastPage.contents[lastPage.contents.length - 1].artworkId : undefined;
      },
      ref: bottom,
      type: type,
      enabled: type === 'main' && categoryType === 'following',
    },
    searchArtworks: {
      queryKey: ['searchArtworks', decodeURI(params.searchWord)],
      queryFn: getSearchArtworks,
      initialPageParam: null,
      getNextPageParam: (lastPage: ArtWorks) => {
        return lastPage?.hasNext ? lastPage.contents[lastPage.contents.length - 1].artworkId : undefined;
      },
      ref: bottom,
      type: type,
      searchWord: decodeURI(params.searchWord),
      enabled: type === 'search',
    },
    artistArtworks: {
      queryKey: ['artistArtworks', params.id, categoryType],
      queryFn: getArtistArtworks,
      initialPageParam: null,
      getNextPageParam: (lastPage: ArtWorks) => {
        return lastPage?.hasNext ? lastPage.contents[lastPage.contents.length - 1].artworkId : undefined;
      },
      ref: bottom,
      type: type,
      userId: params.id,
      categoryType: categoryType,
      enabled: type === 'artist',
    },
    myArtworks: {
      queryKey: ['myArtworks', categoryType],
      queryFn: getMyArtworks,
      initialPageParam: null,
      getNextPageParam: (lastPage: ArtWorks) => {
        return lastPage?.hasNext ? lastPage.contents[lastPage.contents.length - 1].artworkId : undefined;
      },
      ref: bottom,
      type: type,
      categoryType: categoryType,
      enabled: type === 'mypage',
    },
  };

  const argument = Object.values(infiniteQueryArguments).find((value) => value.enabled);
  if (!argument) return;

  const { data, isPending } = useInfiniteData(argument);

  return (
    <>
      <div
        className={`${data?.pages[0]?.contents?.length !== 0 ? (type === 'main' || type === 'search' ? 'card-container-mainPage' : 'card-container-artistPage') : 'flex-col-center md:w-100vw mt-50 h-[55vh] w-full'}`}
      >
        {data &&
          (data.pages[0]?.contents?.length === 0
            ? pathname === '/mypage' && <NoContent />
            : data.pages.map((page: ArtWorks) => {
                const cards = page.contents;
                return cards?.map((card) => {
                  return (
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
                      isPending={isPending}
                    />
                  );
                });
              }))}
        <div ref={bottom} />
      </div>
      {modals.includes('editModal') && <EditUploadModal />}
      {modals.includes('artModal') && <ArtModal />}
      {modals[modals?.length - 1] === 'askForDelete' && <AskForDeleteModal />}
    </>
  );
}

export default CardContainer;
