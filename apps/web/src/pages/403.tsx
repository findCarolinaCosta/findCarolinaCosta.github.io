import Link from 'next/link';
// import { StarBackgroundAnimation } from "../components/contents/StarBackgroundAnimation";
import { useEffect } from 'react';

import { ErrorHeader } from '../components/Header/ErroHeader';

export default function Forbidden() {
  const className = 'dark-theme' as any;

  const addBodyClass = (className: any) =>
    document.body.classList.add(className);

  const removeBodyClass = (className: any) =>
    document.body.classList.remove(className);

  useEffect(() => {
    addBodyClass(className);
  }, []);

  return (
    <div className="h-screen w-screen">
      <ErrorHeader />
      {/* <StarBackgroundAnimation /> */}
      <div className="flex flex-col items-center justify-center h-full gap-1">
        <h1 className="text-3xl font-semibold">Error: 403 Forbidden</h1>
        <span className="text-9xl text-[var(--first-color-second)] font-extrabold sm:text-[16rem]">
          4<i className="uil uil-ban" />3
        </span>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p className="text-xl">You don't have access to this page.</p>
        <Link href="/" className="button button--flex mt-6">
          Go back
        </Link>
      </div>
    </div>
  );
}
