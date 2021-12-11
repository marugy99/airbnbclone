import Link from "next/link";
import Head from "next/head";
import { BsGlobe2, BsList } from "react-icons/bs";
import { FaUserCircle, FaSearch } from "react-icons/fa";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Airbnb Clone By Maru</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;700&family=Roboto+Mono:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>

      <nav className="primary-nav">
        <div className="container">
          <Link href="/">
            <a>
              <img className="logo" src="/airbnb.svg" alt="Airbnb logo" />
            </a>
          </Link>

          <button className="search-bar">
            <p>Start your search</p>
            <FaSearch />
          </button>

          <ul className="account-settings">
            <li>
              <a href="#">Become a Host</a>
            </li>
            <li>
              <a href="#" aria-label="Change language">
                <BsGlobe2 />
              </a>
            </li>
            <li>
              <button aria-label="Toggle user menu">
                <BsList />
                <FaUserCircle />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main>{children}</main>
    </>
  );
};

export default Layout;
