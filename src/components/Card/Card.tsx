'use client';

import { useStore } from '@/store';
import { CardType } from '@/types/cards';
import Image from 'next/image';
import Link from 'next/link';
import ShareLabelImg from '../../..//public/assets/icons/shareFlag.svg';
import SellingLabelImg from '../../../public/assets/icons/saleFlag.svg';
import CommentImage from '../../../public/assets/images/CommentImage.png';
import LikeImage from '../../../public/assets/images/LikeImage.png';
import ViewImage from '../../../public/assets/images/ViewImage.png';
import defaultImage from '../../../public/assets/images/logo.png';
import { Button } from '../Button';
import Count from './Count';
import CardImageFallbackUI from '../FallbackUI/Card/CardImageFallbackUI';
import { useBrowserSize } from '@/hooks/useBrowserSize';

type CustomCardType = Omit<CardType, 'description' | 'createdAt' | 'updatedAt' | 'likeId' | 'followId'>;

interface Props extends CustomCardType {
  type: 'main' | 'mypage' | 'artist' | 'comment' | 'search';
  isPending: boolean;
}

function Card({
  artworkId,
  title,
  artworkStatus,
  thumbnailImageUrl,
  likeCount,
  viewCount,
  commentCount,
  artistId,
  artistName,
  artistProfileImageUrl,
  type,
  isPending,
}: Props) {
  const { showModal, setClickedArtworkId, userId, isLogin } = useStore((state) => ({
    showModal: state.showModal,
    setClickedArtworkId: state.setClickedArtworkId,
    userId: state.userId,
    isLogin: state.isLogin,
  }));
  const { isMobile } = useBrowserSize();

  const handleArtworkClick = () => {
    setClickedArtworkId(artworkId);
    showModal('artModal');
  };

  const urlRegex: RegExp = /^(?!http:\/\/|https:\/\/).+/;
  const displayTitle = isMobile && title.length > 11 ? `${title.substring(0, 11)}...` : title;

  if (isPending) {
    <CardImageFallbackUI type={type} />;
  }

  return (
    <>
      <div
        className={`flex h-${type === 'main' || type === 'search' ? '328' : '280 md:h-180'} min-w-280 flex-col md:min-h-0 md:min-w-80 md:max-w-350`}
      >
        <div
          id="cardImgBox"
          className="group relative h-280 min-w-280 cursor-pointer overflow-hidden rounded-md md:h-180 md:min-h-0 md:min-w-80 md:max-w-350"
          onClick={handleArtworkClick}
        >
          <Image
            className="rounded-md transition-all duration-200 ease-linear group-hover:scale-[1.2]"
            src={!urlRegex.test(thumbnailImageUrl) ? thumbnailImageUrl : defaultImage}
            alt="카드 이미지"
            style={{ objectFit: 'cover' }}
            priority
            fill
          />
          <div className="absolute inset-0 rounded-md bg-gradient-to-b from-transparent via-transparent to-gray-8"></div>
          {type === 'mypage' && (
            <div className="absolute left-18 top-11" onClick={(e) => e.stopPropagation()}>
              <Button.Kebab artworkId={artworkId} />
            </div>
          )}
          {artworkStatus === 'SELLING' ? (
            <div className="absolute right-18 top-0">
              <SellingLabelImg />
            </div>
          ) : artworkStatus === 'FREE' ? (
            <div className="absolute right-18 top-0">
              <ShareLabelImg />
            </div>
          ) : null}
          <div className="items-left absolute bottom-50 flex h-10 w-280 flex-col gap-7 px-15">
            <p className="font-normal text-14 font-semibold leading-normal text-white">{displayTitle}</p>
            <div className="flex items-center gap-12">
              <Count imageSource={LikeImage} imageSourceString="like" count={likeCount} />
              <Count imageSource={ViewImage} imageSourceString="view" count={viewCount} />
              <Count imageSource={CommentImage} imageSourceString="comment" count={commentCount} />
            </div>
          </div>
        </div>
        {(type === 'main' || type === 'search') && (
          <div className="relative flex h-48 w-280 flex-shrink-0 items-center pt-10">
            <Link
              href={isLogin && artistId === userId ? '/mypage' : `/artist/${artistId}`}
              className="flex items-center gap-10"
            >
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src={
                    artistProfileImageUrl && !urlRegex.test(artistProfileImageUrl)
                      ? artistProfileImageUrl
                      : defaultImage
                  }
                  alt="프로필 이미지"
                  fill
                  objectFit="cover"
                />
              </div>
              <p className="text-base font-normal font-bold leading-normal">{artistName}</p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Card;
