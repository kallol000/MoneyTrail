import { getIncome } from "../api/fetch/route";

export const fetchIncome = async () => {
  const res = await getIncome();
  const data = await res.json();
  console.log(data);
  return data;
};
