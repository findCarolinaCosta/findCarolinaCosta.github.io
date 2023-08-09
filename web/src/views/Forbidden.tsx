import { ErrorHeader } from "../components/Header/ErroHeader";
import { Link } from "react-router-dom";
import { StarBackgroundAnimation } from "../components/contents/StarBackgroundAnimation";
import { useEffect } from "react";

export function Forbidden() {
  const className = "dark-theme" as any;

  const addBodyClass = (className: any) =>
    document.body.classList.add(className);

  const removeBodyClass = (className: any) =>
    document.body.classList.remove(className);

  useEffect(() => {
    addBodyClass(className)
  }, []);

  return (
    <div className="h-screen w-screen">
      <ErrorHeader />
      <StarBackgroundAnimation />
      <div className="flex flex-col items-center justify-center h-full gap-1">
        <h1 className="text-3xl font-semibold">Error: 403 Forbidden</h1>
        <span className="text-9xl text-[var(--first-color-second)] font-extrabold sm:text-[16rem]">
          4<i className="uil uil-ban" />3
        </span>
        <p className="text-xl">You don't have access to this page.</p>
        <Link to="/" className="button button--flex mt-6">
          Go back
        </Link>
      </div>
    </div>
  );
}
