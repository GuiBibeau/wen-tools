import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { ConnectButton } from "wen-react";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ConnectButton theme="dark" />
        {/* <ConnectButton theme="base" /> */}
      </main>
    </div>
  );
};

export default Home;
