'use client';

import '@/styles/tailwind.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import logoImg from '../../../public/assets/images/logo.png';
import InfiniteText from '../InfiniteText';
import NavigatorBox from './NavigatorBox';
import SearchBar from './SearchBar';

function NavBar() {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [clickLogo, setClickLogo] = useState(false);

  const pathname = usePathname();
  const pathnameArr = pathname.split('/');
  const firstPathname = pathnameArr[1];

  const handleLogoClick = () => {
    setIsSearchClicked(false);
    setClickLogo(true);
  };

  return (
    <>
      {(pathname === '/' || pathname === '/following') && (
        <InfiniteText text="ART TALK - TALK  🎉  SITE FOR THE ARTISTS  •  DESIGNERS  •  CREATORS  🙌  SHARE YOUR CREATIVITY  😎  " />
      )}
      <nav className={`navBar ${pathname === '/' || pathname === '/following' ? 'sticky' : 'fixed'}`}>
        <div className="flex flex-grow items-center justify-start gap-20">
          <Link href={'/'} className="shrink-0">
            <Image src={logoImg} alt="아트 톡톡 로고" width={115} height={115} onClick={handleLogoClick} />
          </Link>
          {firstPathname === 'myAccount' || (
            <SearchBar
              isSearchClicked={isSearchClicked}
              setIsSearchClicked={setIsSearchClicked}
              clickLogo={clickLogo}
              setClickLogo={setClickLogo}
            />
          )}
        </div>
        <NavigatorBox />
      </nav>
    </>
  );
}

export default NavBar;
