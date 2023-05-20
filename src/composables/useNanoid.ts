import { customAlphabet } from "nanoid";

export const useNanoId = () => {
  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

  const userId = `u-${nanoid(8)}${new Date().getDate()}${
    new Date().getMonth() + 1
  }${new Date().getFullYear()}`;
  const transactionId = `${nanoid(
    8,
  ).toLocaleUpperCase()}-${new Date().getHours()}${new Date().getMinutes()}`;

  return {
    nanoid,
    userId,
    transactionId,
  };
};
