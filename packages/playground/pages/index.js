import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Kit } from "wen-metamask";

export default function Home() {
  return (
    <div className={styles.main}>
      <Kit />
    </div>
  );
}
