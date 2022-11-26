import { useCallback, useEffect, useState } from "react";

export const useVote = () => {
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