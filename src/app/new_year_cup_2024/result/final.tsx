import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const FinalRound = () => {
  return (
    <div>
      <h1>자코컵</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>순위</TableHead>
            <TableHead>멤버</TableHead>
            <TableHead>레이스 결과</TableHead>
            <TableHead>점수</TableHead>
            <TableHead>비고</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1위</TableCell>
            <TableCell>네코마타 오카유</TableCell>
            <TableCell>1/1/1/1</TableCell>
            <TableCell>81점</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <h1>본선</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>순위</TableHead>
            <TableHead>멤버</TableHead>
            <TableHead>레이스 결과</TableHead>
            <TableHead>점수</TableHead>
            <TableHead>비고</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1위</TableCell>
            <TableCell>네코마타 오카유</TableCell>
            <TableCell>1/1/1/1</TableCell>
            <TableCell>81점</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default FinalRound;
