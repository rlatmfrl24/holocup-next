import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Preliminary = () => {
  return (
    <div>
      <h1>예선</h1>
      <h2>A블록</h2>
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
      <h2>B블록</h2>
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
      <h2>C블록</h2>
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

export default Preliminary;
