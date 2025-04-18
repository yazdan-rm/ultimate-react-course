import { motion } from "framer-motion";
import CourseLink from "./CourseLink.jsx";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

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
        <CourseLink>
          <SchoolRoundedIcon
            sx={{ margin: "0 auto" }}
            className={`text-[12rem] h-[15rem] text-gray-300`}
          />
        </CourseLink>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
