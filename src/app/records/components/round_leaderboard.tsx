import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBaseData } from "@/lib/store";
import { useSelectorState } from "../store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { convertMemberCodeToName, sumRacePoints } from "@/lib/utils";

const RoundLeaderboard = () => {
  const memberData = useBaseData((state) => state.memberData);
  const roundData = useBaseData((state) => state.roundData);
  const setEmphasizedMember = useSelectorState(
    (state) => state.setEmphasizedMemberCode
  );
  const { currentCup, currentRound, currentBlock } = useSelectorState((state) =>
    state.getSelectorData()
  );

  // 1. filter data by selector
  const filteredData = roundData.filter(
    (cup) =>
      cup.cup_code === currentCup?.type &&
      cup.year === currentCup?.year &&
      cup.round_code === currentRound &&
      cup.block_code === currentBlock
  );

  // 2. make member result
  type MemberResult = {
    member_code: string;
    member_point: number;
  };

  const memberResults = filteredData
    .map((memberRaceData) => {
      const memberPoint = sumRacePoints(memberRaceData.race_results);
      const memberResult: MemberResult = {
        member_code: memberRaceData.member_code,
        member_point: memberPoint,
      };
      return memberResult;
    })
    .sort((a, b) => b.member_point - a.member_point);

  return (
    <Card className="mb-4 font-notoSans">
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {memberResults.map((memberResult) => {
            return (
              <div
                key={memberResult.member_code}
                className="flex items-center hover:bg-slate-100 py-2 px-4 rounded"
                onMouseEnter={() => {
                  setEmphasizedMember(memberResult.member_code);
                }}
                onMouseLeave={() => {
                  setEmphasizedMember("");
                }}
              >
                <Avatar className="mr-2">
                  <AvatarImage
                    src={`/members/` + memberResult.member_code + `.png`}
                    alt="Avatar"
                  />
                </Avatar>
                <p className="flex flex-col flex-1 mr-10">
                  <span className="font-semibold">
                    {memberData.find(
                      (memberInfo) => memberInfo.id === memberResult.member_code
                    )?.name_kr ?? ""}
                  </span>
                  <span className="text-xs">
                    {convertMemberCodeToName(memberResult.member_code)}
                  </span>
                </p>
                <span className="font-bold">{memberResult.member_point}점</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoundLeaderboard;
