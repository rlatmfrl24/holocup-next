import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePredictionState } from "../store";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  id: string;
  pwd: string;
}

export function Auth() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const setCurrentComponent = usePredictionState().setCurrentComponent;
  const onSubmitInquiry: SubmitHandler<IFormInput> = (data) => {
    console.log("Inquiry::=>" + data.id + " " + data.pwd);
  };
  const predictionList = usePredictionState().predictionList;

  const onSubmitCreate: SubmitHandler<IFormInput> = (data) => {
    if (predictionList.find((prediction) => prediction.userId === data.id)) {
      console.log("Exist");
    } else {
      console.log("Not Exist");
      setCurrentComponent("create");
    }
  };

  return (
    <div className="flex gap-4">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="text-center font-notoSans">
            신규 승부 예측
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <form className="flex flex-col w-72 gap-2">
            <Label htmlFor="newUserId">ID</Label>
            <Input
              id="newUserId"
              placeholder="ID"
              className="mb-2"
              {...register("id", { required: true })}
            />
            <Label htmlFor="newUserPwd">Password</Label>
            <Input
              id="newUserPwd"
              placeholder="Password"
              type="password"
              className="mb-2"
              {...register("pwd", { required: true })}
            />
            <Button
              className="font-notoSans font-semibold"
              onClick={handleSubmit(onSubmitCreate)}
            >
              승부 예측 생성
            </Button>
            <Button
              className="font-notoSans font-semibold"
              variant={"secondary"}
              onClick={handleSubmit(onSubmitInquiry)}
            >
              조회
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
