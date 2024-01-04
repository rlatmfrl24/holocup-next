"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { Auth } from "./auth";
import { PredictionType } from "@/lib/typeDef";
import { usePredictionState } from "../store";

export default function Prediction({
  predictionData,
}: {
  predictionData: PredictionType[];
}) {
  const current = usePredictionState().currentComponent;
  const setPrediction = usePredictionState().setPreidctionList;
  const setCurrentComponent = usePredictionState().setCurrentComponent;

  useEffect(() => {
    setCurrentComponent("auth");
  }, [setCurrentComponent]);

  useEffect(() => {
    setPrediction(predictionData);
  }, [predictionData, setPrediction]);

  return (
    <div className="flex flex-col gap-4">
      <Alert className="font-notoSans">
        <AlertTitle>주의!</AlertTitle>
        <AlertDescription>
          승부 예측은 한 번 생성하면 수정할 수 없습니다.
          <br /> 승부 예측을 위해 사용되는 ID와 Password는 암호화되지 않습니다.
        </AlertDescription>
      </Alert>
      {
        {
          create: <div>create</div>,
          inquiry: <div>inquiry</div>,
          auth: <Auth />,
        }[current]
      }
    </div>
  );
}
