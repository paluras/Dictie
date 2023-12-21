import { SetStateAction, useEffect } from "react";

export const useSetFeeling = (
  similar: number,
  feeling: string,
  setFeeting: { (value: SetStateAction<string>): void; }
) => {
  useEffect(() => {
    if (similar === 0) return;
    similar < 5
      ? setFeeting("😊 Sa incepem")
      : similar <= 50
      ? setFeeting("😔 Poți face mai bine")
      : similar > 50 && similar < 80
      ? setFeeting("😯 Te apropii!")
      : similar > 80 && similar < 90
      ? setFeeting("😃 Lucru excelent!")
      : similar > 90
      ? setFeeting("😍 Ai făcut uimitor!")
      : setFeeting("");
  }, [setFeeting, similar]);

  return feeling;
};
