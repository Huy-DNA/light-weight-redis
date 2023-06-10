import Result from "../result";

export default function format(res: Result<any>): string {
  if (res.error !== null) return `(ERR): ${res.error}`;
  if (res.message !== null) return `(MES): ${res.message}`;

  if (res.value instanceof Array) return `(RES): ${formatArray(res.value)}`;
  if (typeof res.value === "string") return `(RES): ${formatString(res.value)}`;
  return `(RES): ${res.value.toString()}`;
}

function formatArray(val: Array<string>): string {
  if (val.length === 0) return "(empty array)";
  let res = "";
  val.forEach((v, id) => {
    res += `\n${id + 1}) "${v}"`;
  });
  return res;
}

function formatString(val: string): string {
  return `"${val}"`;
}
