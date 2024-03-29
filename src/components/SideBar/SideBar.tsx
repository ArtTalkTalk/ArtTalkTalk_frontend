'use client';

import { deleteFollow } from '@/api/follow/deleteFollow';
import { postFollow } from '@/api/follow/postFollow';
import { getMyPage } from '@/api/users/getMyPage';
import { getUser } from '@/api/users/getUser';
import { Button } from '@/components/Button';
import { useStore } from '@/store';
import '@/styles/tailwind.css';
import { UserType } from '@/types/users';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isNull } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import defaultProfileImg from '../../../public/assets/images/logo.png';
import ProfileFallbackUI from '../FallbackUI/SideBar/ProfileFallbackUI';
import AddLinkIcon from './AddLinkIcon';
import LinkIcon from './LinkIcon';
import DOMPurify from 'dompurify';
import ArrowDown from '../SvgComponents/ArrowDown';
import MobileSideBar from './MobileSideBar';

interface SideBarProps {
  displayStatus: 'myWork' | 'notMyWork';
}

function SideBar({ displayStatus }: SideBarProps) {
  const [isFollowClicked, setIsFollowClicked] = useState(false);
  const [followId, setFollowId] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<UserType | undefined>();
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);

  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { isLogin, userId } = useStore((state) => ({
    isLogin: state.isLogin,
    userId: state.userId,
  }));

  const isMyProfile = useMemo(() => !!isLogin && displayStatus === 'myWork', [isLogin]);

  const { data, isPending } = useQuery({
    queryKey: isMyProfile ? ['myInfo'] : ['artistInfo', params.id],
    queryFn: isMyProfile ? getMyPage : () => getUser(params.id),
    staleTime: 3 * 1000,
  });

  useEffect(() => {
    if (!data || isPending) return;
    const userInfo = isMyProfile ? data?.userProfileResponse : data;
    setUserInfo(userInfo);
    setIsFollowClicked(!isNull(data.followId));
    setFollowId(data.followId);
  }, [data]);

  const postFollowMutation = useMutation({
    mutationFn: postFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artistInfo'] });
    },
  });

  const deleteFollowMutation = useMutation({
    mutationFn: deleteFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artistInfo'] });
    },
  });

  const handleFollow = () => {
    postFollowMutation.mutate(
      { userId, receiverId: Number(params.id) },
      {
        onSuccess: (data: { followId: number }) => {
          setIsFollowClicked(true);
          setFollowId(data.followId);
        },
      },
    );
  };

  const handleUnFollow = () => {
    deleteFollowMutation.mutate(
      { userId: userInfo?.userId, followId },
      {
        onSuccess: () => {
          setIsFollowClicked(false);
          setFollowId(null);
        },
      },
    );
  };

  const handleShowMobileSidebar = () => {
    setShowMobileSideBar(true);
  };

  const handleHideMobileSidebar = () => {
    setShowMobileSideBar(false);
  };

  if (showMobileSideBar) {
    return <MobileSideBar displayStatus={displayStatus} onClose={handleHideMobileSidebar} />;
  }

  if (isPending || typeof isLogin === 'undefined') {
    return <ProfileFallbackUI />;
  }

  return (
    <div className="fixed ml-35 h-700 w-260 rounded-sm md:relative md:ml-0 md:mt-110 md:h-270 md:w-full">
      <div className="absolute -top-55 left-1/2 z-first h-120 w-120 -translate-x-1/2 transform rounded-full md:-top-5">
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-solid border-gray-4 bg-white">
          <Image
            src={userInfo?.profileImageUrl ? userInfo.profileImageUrl : defaultProfileImg}
            alt="프로필 이미지"
            objectFit="cover"
            fill
          />
        </div>
      </div>
      <div className="absolute top-5 flex h-full w-260 flex-col items-center rounded-[12px] bg-gray-1 md:top-55 md:h-227 md:w-full">
        <div className="mt-70 flex h-full w-192 flex-col items-center md:relative">
          <div className="flex-col-center">
            <div className="items-center text-center text-18 font-semibold">{userInfo?.nickname}</div>
            <p className="text-12 text-gray-9">{userInfo?.activityArea + ' / ' + userInfo?.activityField}</p>
          </div>
          <div className="mb-16 mt-16 flex min-h-60 w-192 items-center rounded-sm bg-white p-16 md:hidden">
            {userInfo?.description && (
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(userInfo?.description.replaceAll(/\n/g, '<br/>')),
                }}
                className="text-12 text-gray-9"
              ></p>
            )}
          </div>
          {displayStatus === 'notMyWork' ? (
            <div className="mb-24 flex gap-12 md:mb-0 md:mt-16">
              {isFollowClicked ? (
                <Button
                  isLink={false}
                  classname="relative group primary-button artModal-following-button"
                  onClick={handleUnFollow}
                >
                  <span className="group-hover:opacity-0">팔로잉</span>
                  <span className="absolute left-[50%] top-[50%] w-full translate-x-[-50%] translate-y-[-50%] opacity-0 group-hover:opacity-100">
                    언팔로우
                  </span>
                </Button>
              ) : (
                <Button isLink={false} classname="primary-button sideBar-follow-button" onClick={handleFollow}>
                  팔로우
                </Button>
              )}
              {/*  TODO: 추후 destination 바뀔 예정 */}
              {/* <Button isLink={true} destination="/chat" classname="primary-button artModal-chat-button">
                1:1 채팅
              </Button> */}
            </div>
          ) : null}
          <div className="mb-30 flex items-center justify-between gap-20 md:mt-24">
            <span className="count">
              좋아요&nbsp;&nbsp;<span className="text-14 font-bold">{userInfo?.totalLikeCount}</span>&nbsp;개
            </span>
            <div className="h-25 w-2 bg-white"></div>
            <span className="count">
              팔로워 &nbsp;&nbsp;<span className="text-14 font-bold">{userInfo?.followerCount}</span>&nbsp;명
            </span>
          </div>
          <div className="mb-20 flex flex-col items-start gap-20 md:hidden">
            {userInfo?.links &&
              userInfo.links.map((link) => (
                <a
                  className=" flex gap-2 text-14 font-semibold"
                  href={link.url.startsWith('http') ? link.url : 'https://' + link.url}
                  key={link.linkId}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcon />
                  {link.url.length > 21
                    ? link.title + ' ' + link.url.slice(0, 21) + '...'
                    : link.title + ' ' + link.url}
                </a>
              ))}
          </div>
          {displayStatus === 'myWork' ? (
            <Link href="/myAccount" className="flex w-116 items-center gap-4 text-12 text-gray-9">
              <AddLinkIcon />
              {userInfo?.links && userInfo.links.length === 5 ? '링크 수정하기' : '링크 추가하기'}
            </Link>
          ) : null}
          {/* <div
            className="flex-center absolute hidden h-15 w-15 animate-bounce cursor-pointer md:block bottom-0"
            onClick={handleShowMobileSidebar}
          >
            <ArrowDown />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
