'use client';

import { postUserId } from '@/api/auth/postSocialInfo';
import { useStore } from '@/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function RedirectToHome() {
  const router = useRouter();
  const { data: session } = useSession();

  const { setUserAccessToken, setUserRefreshToken, setUserRole, setLogin, setLogout } = useStore((state) => ({
    setUserAccessToken: state.setUserAccessToken,
    setUserRefreshToken: state.setUserRefreshToken,
    setUserRole: state.setUserRole,
    setLogin: state.setLogin,
    setLogout: state.setLogout,
  }));

  const socialId = session?.user.id;
  const socialType = socialId?.length === 10 ? 'KAKAO' : 'NAVER';

  const handleUserId = useCallback(async () => {
    if (!session) return;

    try {
      const { accessToken, refreshToken, userRole } = await postUserId(socialId, socialType);
      setUserAccessToken(accessToken);
      setUserRefreshToken(refreshToken);
      setUserRole(userRole);

      setLogin();

      if (userRole === 'REGULAR') router.replace('/');
      else if (userRole === 'ASSOCIATE') router.replace('/signup');
    } catch (error) {
      console.error(error);
      setLogout();
    }
  }, [socialId, socialType]);

  // 이부분 때문에 strictMode 해제
  useEffect(() => {
    handleUserId();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleUserId]);
  return null;
}
