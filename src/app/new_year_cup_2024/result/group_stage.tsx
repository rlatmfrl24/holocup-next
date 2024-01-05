import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const GroupStage = () => {
  return (
    <div>
      <h1>그룹 스테이지</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>순위</TableHead>
            <TableHead>예선 성적</TableHead>
            <TableHead>멤버</TableHead>
            <TableHead>레이스 결과</TableHead>
            <TableHead>점수</TableHead>
            <TableHead>결과</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1위</TableCell>
            <TableCell>C블록 2위</TableCell>
            <TableCell>네코마타 오카유</TableCell>
            <TableCell>1/1/1/1</TableCell>
            <TableCell>81점</TableCell>
            <TableCell>진출</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default GroupStage;
