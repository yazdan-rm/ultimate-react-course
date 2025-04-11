import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@mui/styles";

function FeatureLink({ children }) {
  const userTheme = useTheme();

  return (
    <Link
      to="/app/university/course"
      style={{
        backgroundColor: userTheme.palette.primary.main,
      }}
      className=" inline-block h-[22rem] shadow-24 rounded-2xl overflow-hidden"
    >
      <motion.button
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.8 }}
        className={`w-[15em] h-[15em] rounded-xl`}
      >
        {children}
      </motion.button>
    </Link>
  );
}

export default FeatureLink;
