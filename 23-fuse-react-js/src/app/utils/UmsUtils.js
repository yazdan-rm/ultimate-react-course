import jalaali from "jalaali-js";

export function toShamsiDate(isoDateStr) {
  if (!isoDateStr) return "";
  const date = new Date(isoDateStr);
  const { gy, gm, gd } = {
    gy: date.getFullYear(),
    gm: date.getMonth() + 1, // months are 0-based in JS
    gd: date.getDate(),
  };

  const { jy, jm, jd } = jalaali.toJalaali(gy, gm, gd);
  return `${jy}/${jm.toString().padStart(2, "0")}/${jd.toString().padStart(2, "0")}`;
}

const GenderMap = {
  1: "مرد",
  2: "زن",
  3: "مختلط",
};

export function getGenderText(value) {
  return GenderMap[value] || "نامشخص";
}
