import Link from "next/link";
import Head from "next/head";
import { BsGlobe2, BsList } from "react-icons/bs";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const route = router.route;

  return (
    <>
      <Head>
        <title>Airbnb Clone By Maru</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;700&family=Roboto+Mono:wght@300&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossorigin=""
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
