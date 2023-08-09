import { Link } from "react-router-dom";

export function ErrorHeader() {
  return (
    <header className={`header`} id="header">
      <nav className="nav container">
        <Link to="/" className="nav__logo">
          Carolina
        </Link>
      </nav>
    </header>
  );
}
