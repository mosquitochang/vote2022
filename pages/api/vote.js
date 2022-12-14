import * as cheerio from "cheerio";

export default async (req, res) => {
  const data = await fetch(
    "https://referendum.2022.nat.gov.tw/zh-TW/F1/00000000000000000.html"
  );
  const body = await data.text();
  const $ = cheerio.load(body);

  const [finishedPlaceCount, unfinishedPlaceCount] = $(
    ".table-header .subtitle>div"
  )
    .text()
    .trim()
    .split("投開票所數 已送/應送: ")[1]
    .split("/");

  const agreedVoteCount = $(
    ".table-content > .tablesaw:nth-child(1) .numeric:nth-child(1)"
  ).text().split(',').join('');
  const disagreedVoteCount = $(
    ".table-content > .tablesaw:nth-child(1) .numeric:nth-child(2)"
  ).text().split(',').join('');
  const validVoteCount = $(
    ".table-content > .tablesaw:nth-child(2) .numeric:nth-child(1)"
  ).text().split(',').join('');
  const invalidVoteCount = $(
    ".table-content > .tablesaw:nth-child(2) .numeric:nth-child(2)"
  ).text().split(',').join('');
  const allVoteCount = $(
    ".table-content > .tablesaw:nth-child(2) .numeric:nth-child(3)"
  ).text().split(',').join('');
  const allPeopleCount = $(
    ".table-content > .tablesaw:nth-child(3) .numeric:nth-child(1)"
  ).text().split(',').join('');
  const votedFinishedPlacePercent = $(
    ".table-content > .tablesaw:nth-child(3) .numeric:nth-child(2)"
  )
    .text()
    .split("%")[0];
  const validAgreedVoteToAllPeoplePercent = $(
    ".table-content > .tablesaw:nth-child(4) .numeric:nth-child(1)"
  )
    .text()
    .split("%")[0];

  const updatedTime = $(".table-footer-right")
    .text()
    .split("資料更新時間:")[1].trim();

  const timestamp = Date.now()
  
  res.status(200).json({
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
      timestamp
    },
  });
};
