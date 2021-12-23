import Link from "next/link";
import Head from "next/head";
import { BsGlobe2, BsList } from "react-icons/bs";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const route = router.route;
  console.log(route);

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
        <div className={`container ${route === "/" ? "home" : ""}`}>
          <div>
            <Link href="/">
              <a>
                <img className="logo" src="/airbnb.svg" alt="Airbnb logo" />
              </a>
            </Link>
          </div>

          <button className="search-bar">
            <p>Start your search</p>
            <FaSearch />
          </button>

          <ul className="account-settings">
            <li>
              <a href="#" className="text-base">
                Become a Host
              </a>
            </li>
            <li>
              <BsGlobe2 />
            </li>
            <li>
              <button className="user-settings" aria-label="Toggle user menu">
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
