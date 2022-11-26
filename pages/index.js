import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [voteData, setVoteData] = useState({
    finishedPlaceCount: 0,
    unfinishedPlaceCount: 0,
    agreedVoteCount: 0,
    disagreedVoteCount: 0,
    validVoteCount: 0,
    invalidVoteCount: 0,
    allVoteCount: 0,
    votedPeopleCount: 0,
    votedFinishedPlacePercent: 0,
    validAgreedVoteToVotedPeoplePercent: 0,
  });
  const {
    finishedPlaceCount,
    unfinishedPlaceCount,
    agreedVoteCount,
    disagreedVoteCount,
    validVoteCount,
    invalidVoteCount,
    allVoteCount,
    votedPeopleCount,
    votedFinishedPlacePercent,
    validAgreedVoteToVotedPeoplePercent,
  } = voteData

  useEffect(() => {
    const fetchData = async () => {
      const raw = await fetch("/api/vote");
      const data = await raw.json();
      setVoteData(data.data);
    }
    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <div>
        <div>{finishedPlaceCount}</div>
        <div>{unfinishedPlaceCount}</div>
        <div>{agreedVoteCount}</div>
        <div>{disagreedVoteCount}</div>
        <div>{validVoteCount}</div>
        <div>{invalidVoteCount}</div>
        <div>{allVoteCount}</div>
        <div>{votedPeopleCount}</div>
        <div>{votedFinishedPlacePercent}</div>
        <div>{validAgreedVoteToVotedPeoplePercent}</div>
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://next.new" target="_blank" rel="noopener noreferrer">
          Created with&nbsp;<b>next.new</b>&nbsp;⚡️
        </a>
      </footer>
    </div>
  );
}
