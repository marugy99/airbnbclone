import Link from "next/link";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Airbnb Clone By Maru</title>
      </Head>
      <header>
        <Link href="/">
          <a>Home</a>
        </Link>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
