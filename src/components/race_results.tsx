function RaceResults({ race_results }: { race_results: number[] }) {
  return (
    <>
      {race_results.map((rank, idx) => {
        return (
          <span
            key={idx}
            className={
              `w-8 h-8 flex items-center justify-center rounded-sm font-bold ` +
              (rank === 1 ? `bg-yellow-400 ` : ``) +
              (rank === 2 ? `bg-gray-400 ` : ``) +
              (rank === 3 ? `bg-yellow-700 ` : ``) +
              (rank > 3 && rank <= 9 ? `bg-slate-200 ` : ``) +
              (rank > 9 ? `bg-red-400 ` : ``) +
              (rank === -1 ? `bg-violet-400 ` : ``)
            }
          >
            {rank === -1 ? `DNF` : rank}
          </span>
        );
      })}
    </>
  );
}

export default RaceResults;
