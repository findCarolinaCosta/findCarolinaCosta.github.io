import Link from 'next/link';

export function ErrorHeader() {
  return (
    <header className={`header`} id="header">
      <nav className="nav container">
        <Link href="/" className="nav__logo">
          Carolina
        </Link>
      </nav>
    </header>
  );
}
