import util from "util";
export function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}
