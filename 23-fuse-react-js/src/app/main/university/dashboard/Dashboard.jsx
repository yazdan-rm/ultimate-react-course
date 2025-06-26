import { motion } from "framer-motion";
import ShortcutLink from "./ShortcutLink.jsx";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import Typography from "@mui/material/Typography";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AssignmentIcon from "@mui/icons-material/Assignment";

function Dashboard() {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-wrap justify-start items-start gap-40 p-6 m-24"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <ShortcutLink redirectUrl={"/app/university/course"}>
          <SchoolRoundedIcon
            sx={{ margin: "0 auto" }}
            className={`text-[12rem] h-[15rem] text-gray-300`}
          />
          <Typography className={"text-gray-300"}>تعریف دوره</Typography>
        </ShortcutLink>
      </motion.div>
      <motion.div variants={item}>
        <ShortcutLink
          redirectUrl={"/app/university/reports/exclusive-courses-for-student"}
        >
          <AssignmentIndIcon
            sx={{ margin: "0 auto" }}
            className={`text-[12rem] h-[15rem] text-gray-300`}
          />
          <Typography className={"text-gray-300"}>
            لیست دروس ارائه شده
          </Typography>
        </ShortcutLink>
      </motion.div>
      <motion.div variants={item}>
        <ShortcutLink
          redirectUrl={"/app/university/course-enrollment/main-enrollment"}
        >
          <HowToRegIcon
            sx={{ margin: "0 auto" }}
            className={`text-[12rem] h-[15rem] text-gray-300`}
          />
          <Typography className={"text-gray-300"}>ثبت نام اصلی</Typography>
        </ShortcutLink>
      </motion.div>
      <motion.div variants={item}>
        <ShortcutLink
          redirectUrl={"/app/university/reports/student-enrollment-result"}
        >
          <AssignmentIcon
            sx={{ margin: "0 auto" }}
            className={`text-[12rem] h-[15rem] text-gray-300`}
          />
          <Typography className={"text-gray-300"}>
            نتیجه ثبت نام دانشجو
          </Typography>
        </ShortcutLink>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
