import Image from "next/image";
import styles from "./page.module.css";
import Head from 'next/head';
import Tools from "./components/Tools/Tools";

export default function Home() {
  return (
    <div>
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Tools />
      </main>
    </div>
  )
}
