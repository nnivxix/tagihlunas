import { useDateFormat } from "@vueuse/core";

export const timeFormated = (time: string, format: string) => {
  return useDateFormat(time, format).value.replace('"', "");
};
