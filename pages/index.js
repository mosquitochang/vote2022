import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useCallback, useEffect, useState } from "react";

const useVote = () => {
  const [voteData, setVoteData] = useState({
    finishedPlaceCount: 0,
    unfinishedPlaceCount: 0,
    agreedVoteCount: 0,
    disagreedVoteCount: 0,
    validVoteCount: 0,
    invalidVoteCount: 0,
    allVoteCount: 0,
    allPeopleCount: 0,
    votedFinishedPlacePercent: 0,
    validAgreedVoteToAllPeoplePercent: 0,
    updatedTime: 0,
    timestamp: 0
  });

  const refetchData = useCallback(() => {
    const fetchData = async () => {
      const raw = await fetch("/api/vote");
      const data = await raw.json();
      setVoteData(data.data);
    };
    fetchData();
  },[])

  useEffect(() => {
    refetchData()

    const timer = setInterval(refetchData, 10000);
    return () => clearInterval(timer)
  }, []);

  return { data: voteData, refetchData };
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Bar = ({ title, partCount, allCount, needLine, isSmall }) => {
  return (
    <div
      style={{
        width: isSmall ? "50%" : "100%",
        display: "flex",
        gap: isSmall ? "4px" : '12px',
        fontSize: isSmall ? "12px" : "16px",
        flexDirection: isSmall ? "row" : "column",
        alignItems: isSmall ? 'center' : 'stretch'
      }}
    >
      <div style={{ flex: "none" }}>{title}</div>
      <div
        style={{
          flex: isSmall? "1" : 'none',
          height: isSmall ? "25px" : "50px",
          border: "1px solid #000",
          position: "relative",
          background: "#fff",
        }}
      >
        <div
          style={{
            width: `${(partCount * 100) / allCount}%`,
            height: "100%",
            background: "#000",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "4px",
            left: "4px",
            mixBlendMode: "difference",
            color: "#fff",
            zIndex: "10",
          }}
        >
          {numberWithCommas(partCount)} / {numberWithCommas(allCount)}
        </div>
        {needLine && (
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "50%",
              height: "100%",
              borderLeft: "1px dotted #fff",
              mixBlendMode: "difference",
              display: "flex",
              alignItems: "flex-end",
              fontSize: "12px",
              paddingBottom: "4px",
              color: "#fff",
            }}
          >
            ??????????????????
          </div>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const {
    data: {
      finishedPlaceCount,
      unfinishedPlaceCount,
      agreedVoteCount,
      disagreedVoteCount,
      validVoteCount,
      invalidVoteCount,
      allVoteCount,
      allPeopleCount,
      votedFinishedPlacePercent,
      validAgreedVoteToAllPeoplePercent,
      updatedTime,
      timestamp,
    },
    refetchData,
  } = useVote();

  const dateString = new Date(timestamp).toLocaleTimeString('zh-TW')



  return (
    <div className={styles.container}>
      <Head>
        <title>??????????????????????????????1???????????????</title>
      </Head>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          width: "100%",
          gap: "16px",
          padding: "16px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            width: "100%",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          ??????????????????????????????1???????????????
        </div>
        <div
          style={{
            textAlign: "center",
            width: "100%",
            marginBottom: "24px",
          }}
        >
          ??????????????????????????????
        </div>

        <Bar
          title={"?????????????????? / ???????????????"+(agreedVoteCount*100/19239392).toFixed(2)+"%"}
          partCount={agreedVoteCount}
          allCount={19239392}
          needLine={true}
        />
        <Bar
          title="??????????????????"
          partCount={finishedPlaceCount}
          allCount={unfinishedPlaceCount > 0 ? unfinishedPlaceCount : 17649 }
          isSmall={true}
        />

        <div
          style={{
            marginTop: "36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            width: "100%",
            gap: "16px",
          }}
        >
          <div>?????????????????????{dateString}</div>
          <button onClick={refetchData}>
            ????????????????????????10?????????????????????
          </button>
        </div>
      </div>
    </div>
  );
}
