import { useBaseData } from "@/lib/store";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSelectorState } from "../store";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RoundChart = () => {
  const baseData = useBaseData((state) => state.roundData);
  const { currentCup, currentRound, currentBlock } = useSelectorState((state) =>
    state.getSelectorData()
  );
  const emphasizeMemberCode = useSelectorState(
    (state) => state.emphasizedMemberCode
  );
  const memberData = useBaseData((state) => state.memberData);
  const [entries, setEntries] = useState<string[]>([]);
  const [chartData, setChartData] = useState<Object[]>([]);

  const makeTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-50 p-3 shadow-lg flex flex-col rounded">
          <p className="font-poppins text-lg font-semibold border-b mb-2">
            {"Race " + (label + 1)}
          </p>
          <div className="flex flex-col gap-1">
            {payload.map((data: any) => {
              const member = memberData.find((member) => {
                return member.id === data.name;
              });

              return (
                <p key={data.name} className="flex font-noto_kr">
                  <span
                    style={{
                      color: member?.color_primary,
                    }}
                  >
                    {member?.oshi_mark + ` ` + member?.name_kr}
                  </span>
                  <span className="flex-1 px-5"></span>
                  {data.value === 13 ? "실격" : data.value + `위`}
                </p>
              );
            })}
          </div>
        </div>
      );
    }
  };

  const makeCustomizedLabel = (props: any) => {
    const { x, y, stroke, value } = props;
    return (
      <text
        x={x}
        y={y}
        dy={-10}
        fill={stroke}
        fontSize={20}
        textAnchor="middle"
      >
        {value === 13 ? "실격" : value + "위"}
      </text>
    );
  };

  useEffect(() => {
    //1. filter data by selector
    const roundData = baseData.filter(
      (cup) =>
        cup.cup_code === currentCup?.type &&
        cup.year === currentCup?.year &&
        cup.round_code === currentRound &&
        cup.block_code === currentBlock
    );

    //2. make chart data
    const chartData: Object[] = [];

    roundData.map((memberRaceData) => {
      memberRaceData.race_results.map((raceResult, index) => {
        if (chartData[index]) {
          chartData[index] = {
            ...chartData[index],
            [memberRaceData.member_code]: raceResult > 0 ? raceResult : 13,
          };
        } else {
          chartData[index] = {
            raceNum: index + 1,
            [memberRaceData.member_code]: raceResult > 0 ? raceResult : 13,
          };
        }
      });
    });

    //3. reset entries
    if (chartData.length !== 0) {
      const entries = Object.keys(chartData[0]).filter(
        (key) => key !== "raceNum"
      );
      setEntries(entries);
    }

    setChartData(chartData);
  }, [
    baseData,
    currentCup?.type,
    currentCup?.year,
    currentRound,
    currentBlock,
  ]);

  return (
    <Card className="flex-1 mb-4">
      <CardHeader>
        <CardTitle>Round Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={550}>
          <LineChart data={chartData}>
            <Tooltip content={makeTooltipContent} />
            <XAxis
              padding={{ left: 20, right: 20 }}
              tickFormatter={(tick) => {
                return `Race ${tick + 1}`;
              }}
            />
            <YAxis
              padding={{ top: 20, bottom: 20 }}
              width={5}
              reversed
              domain={["dataMin", "dataMax"]}
              tick={false}
            />
            {entries.map((memberCode) => {
              return (
                <Line
                  className={`${
                    emphasizeMemberCode !== "" &&
                    emphasizeMemberCode !== memberCode
                      ? "opacity-20"
                      : ""
                  }`}
                  key={memberCode}
                  type="monotone"
                  dataKey={memberCode}
                  stroke={
                    memberData.find((data) => data.id === memberCode)
                      ?.color_primary ?? "red"
                  }
                  strokeWidth={emphasizeMemberCode === memberCode ? 4 : 2}
                  label={
                    emphasizeMemberCode === memberCode
                      ? makeCustomizedLabel
                      : ""
                  }
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RoundChart;
