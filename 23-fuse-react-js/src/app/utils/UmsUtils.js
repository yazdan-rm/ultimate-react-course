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

export function toLocalTime(isoDateStr) {
  if (!isoDateStr) return "";
  const date = new Date(isoDateStr);
  return date.toLocaleTimeString("fa-IR", {
    timeZone: "Asia/Tehran",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

const GenderMap = {
  1: "مرد",
  2: "زن",
  3: "مختلط",
};

export function getGenderText(value) {
  return GenderMap[value] || "";
}

const CoursePrerequisiteTypes = {
  11: "پیش نیاز",
  12: "همنياز",
  13: "معادل",
  14: "متضاد",
};

export function getCoursePrerequisiteText(value) {
  return CoursePrerequisiteTypes[value] || "";
}

const EducationalLevelMap = {
  1: "کاردانی",
  3: "کارشناسی",
  4: "کارشناسی ارشد",
  5: "دکترا",
  6: "دانشوری",
  8: "ارشد",
  9: "حوزوی",
  14: "نامشخص",
};

export function getEducationalLevelText(value) {
  return EducationalLevelMap[value] || "";
}

export function generateSemesters() {
  const result = [];
  const today = new Date();
  const { jy } = jalaali.toJalaali(today);
  const startYear = jy - 4; // 4 years before
  const totalYears = 5; // 4 before + 10 after

  for (let i = totalYears - 1; i >= 0; i--) {
    const academicStart = startYear + i;
    const academicEnd = academicStart + 1;
    const codeBase = academicStart - 1000;

    // First semester
    result.push({
      code: parseInt(`${codeBase}1`),
      description: `نيمسال اول سال تحصيلي ${academicEnd}-${academicStart}`,
    });

    // Second semester
    result.push({
      code: parseInt(`${codeBase}2`),
      description: `نيمسال دوم سال تحصيلي ${academicEnd}-${academicStart}`,
    });

    // Summer semester (optional based on your data)
    result.push({
      code: parseInt(`${codeBase}3`),
      description: `نيمسال (تابستان) ${codeBase}3`,
    });
  }

  return result;
}

export function getSemesterTitleByCode(code) {
  const codeStr = String(code);

  const baseYear = parseInt(codeStr.slice(0, codeStr.length - 1)) + 1000;
  const semesterType = codeStr.slice(-1); // '1', '2', or '3'

  const startYear = baseYear;
  const endYear = startYear + 1;

  switch (semesterType) {
    case "1":
      return `نيمسال اول سال تحصيلي ${endYear}-${startYear}`;
    case "2":
      return `نيمسال دوم سال تحصيلي ${endYear}-${startYear}`;
    case "3":
      return `نيمسال (تابستان) ${codeStr}`;
    default:
      return "کد نيمسال نامعتبر است";
  }
}

const DayOfWeek = {
  SATURDAY: "شنبه",
  SUNDAY: "یک‌شنبه",
  MONDAY: "دوشنبه",
  TUESDAY: "سه‌شنبه",
  WEDNESDAY: "چهارشنبه",
  THURSDAY: "پنج‌شنبه",
  FRIDAY: "جمعه",
};

export function getPersianDayOfWeek(value) {
  return DayOfWeek[value] || "";
}
