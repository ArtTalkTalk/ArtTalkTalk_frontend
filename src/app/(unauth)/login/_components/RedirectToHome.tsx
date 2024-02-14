'use client';

import { postUserId } from '@/api/auth/postSocialInfo';
import { useStore } from '@/store';
import { useSession } from 'next-auth/react';
import { LocaleRouteNormalizer } from 'next/dist/server/future/normalizers/locale-route-normalizer';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default async function RedirectToHome() {
  const router = useRouter();
  const { data: session } = useSession();

  const { setUserAccessToken, setUserRefreshToken, setUserRole } = useStore((state) => ({
    setUserAccessToken: state.setUserAccessToken,
    setUserRefreshToken: state.setUserRefreshToken,
    setUserRole: state.setUserRole,
  }));

  const socialId = session?.user.id;
  const socialType = socialId?.length === 10 ? 'KAKAO' : 'NAVER';

  const handleUserId = async () => {
    try {
      const { accessToken, refreshToken, userRole } = await postUserId(socialId, socialType);
      setUserAccessToken(accessToken);
      setUserRefreshToken(refreshToken);
      setUserRole(userRole);
    } finally {
      router.replace('/');
    }
  };

  console.log(localStorage.getItem('store'));

  useEffect(() => {
    if (session) {
      handleUserId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  return null;
}
