import Head from "next/head";
import { FC } from "react";
import { Navbar } from "../ui/Navbar";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <nav>
          <Navbar />
        </nav>
      </Head>
      <main
        style={{
          padding: "20px 50px",
        }}
      >
        {children}
      </main>
    </>
  );
};
