import Link from "next/link";

export default function About() {
  const sources = [
    "https://arca.live/b/holopro/66889030?target=all&keyword=%EC%A0%95%EC%9B%94&p=1",
    "https://arca.live/b/holopro/65474900?target=all&keyword=%EC%A0%95%EC%9B%94%EC%BB%B5&p=1",
    "https://arca.live/b/holopro/65472810?target=all&keyword=%EC%A0%95%EC%9B%94%EC%BB%B5&p=1",
    "https://gall.dcinside.com/mgallery/board/view/?id=kizunaai&no=7086344&search_pos=-7065637&s_type=search_subject_memo&s_keyword=.EC.A0.95.EC.9B.94&page=1",
    "https://gall.dcinside.com/mgallery/board/view/?id=kizunaai&no=3892799",
    "https://hololive.wiki/wiki/Hololive_New_Year_Cup",
    "https://www.reddit.com/r/Hololive/comments/kvlh2f/new_years_cup_2021_match_results_standings_mario/",
    "https://docs.google.com/spreadsheets/d/1XH1hPKc-RczTbDCilbQ3C4HJCySwHDN8W7o0T0KZsZA/edit#gid=224210193",
    "https://youtu.be/0gjhIxtAHHE",
  ];

  return (
    <div className="p-4 flex-1">
      <h1 className="text-4xl font-extrabold">About</h1>
      <p className="flex flex-col my-2">
        <span>이 페이지는 홀로라이브와 관련없는 팬페이지입니다.</span>
        <span>
          추가하고 싶은 기능이나 버그 리포트는{" "}
          <a
            href="mailto:397love@gmail.com"
            className="text-blue-500 underline"
          >
            397love@gmail.com
          </a>
          으로 보내주세요.
        </span>
        <span>
          현재 모바일 버전은 준비중입니다. PC화면에 최적화된 페이지입니다.
        </span>
      </p>
      <p className="flex flex-col my-2">
        <span>
          This page is NOT hololive offical page. This page is made by fans.
        </span>
        <span>Any feature you want to add or Bug reports,</span>
        <span>
          Please send me E-mail to{" "}
          <a
            href="mailto:397love@gmail.com"
            className="text-blue-500 underline"
          >
            397love@gmail.com
          </a>
        </span>
        <span>Currently, the mobile version is under development.</span>
        <span>This page is optimized for PC screen.</span>
      </p>
      <h2 className="text-3xl font-semibold mt-6">References</h2>
      <p className="flex flex-col my-2">
        <span>
          해당 데이터 소스는 오로지 데이터 활용 용도로만 사용되었으며, 제작자와
          어떠한 방식으로도 무관한 커뮤니티 및 사이트입니다.
        </span>
        <span>
          해당 데이터는 원작자의 동의를 받아 활용하였으며, 이후 별도의 문의가
          있을시 관련 데이터 삭제 후 대체 데이터로 충원할 것입니다.
        </span>
        <span>
          또한, 어떠한 방식으로도 영리적인 목적을 추구하지 않으며 오로지 학습
          용도로 활용되 었습니다.
        </span>
        <span>
          해당 사이트로 인하여 저작권 피해를 받거나 어려움이 있으실시
          <a
            href="mailto:397love@gmail.com"
            className="text-blue-500 underline"
          >
            397love@gmail.com
          </a>
          로 연락주시면 도와드리겠습니다.
        </span>
      </p>
      <ul className="list-disc list-inside">
        {sources.map((source, index) => (
          <li key={index}>
            <Link href={source} passHref className="text-blue-500 underline">
              {source}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
