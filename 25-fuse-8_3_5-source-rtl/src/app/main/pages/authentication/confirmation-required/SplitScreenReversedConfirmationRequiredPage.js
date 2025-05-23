import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function SplitScreenReversedConfirmationRequiredPage() {
  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0">
      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: 'primary.main' }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: 'primary.light' }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: 'primary.light' }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
        </Box>

        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>به تیم ما</div>
            <div>خوش آمدید</div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
           فیوز به دولوپرها کمک می‌کند تا داشبوردهای سازمان‌یافته و کدگذاری‌شده‌ای با ظاهر بسیار زیبا و سورس بسیار قدرتمند بسازند
به ما بپیوندید و اپلیکیشن خودتون رو از همین امروز با یک قالب مدیریت مدرن و به روز، توسعه بدید
          </div>
          <div className="flex items-center mt-32">
            <AvatarGroup
              sx={{
                '& .MuiAvatar-root': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <Avatar src="assets/images/avatars/female-18.jpg" />
              <Avatar src="assets/images/avatars/female-11.jpg" />
              <Avatar src="assets/images/avatars/male-09.jpg" />
              <Avatar src="assets/images/avatars/male-16.jpg" />
            </AvatarGroup>

            <div className="ml-16 font-medium tracking-tight text-gray-400">
              خرید بیش از 9 هزار نفر در سایت رسمی تم فارست
            </div>
          </div>
        </div>
      </Box>

      <Paper className="h-full sm:h-auto md:flex md:items-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none rtl:border-r-1 ltr:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/logo.svg" alt="قالب ادمین ری اکتی Fuse" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            نیازمند تایید
          </Typography>
          <Typography className="mt-16">
          یک نامه تأیید با دستورالعمل به آدرس ایمیل شما ارسال شده است. این دستورالعمل ها را دنبال کنید تا آدرس ایمیل خود را تأیید کرده و حساب خود را فعال کنید.
          </Typography>

          <Typography className="mt-32 text-md font-medium" color="text.secondary">
           <span>بازگشت به</span>
            <Link className="ml-4 text-primary-500 hover:underline" to="/sign-in">
              ورود به سامانه
            </Link>
          </Typography>
        </div>
      </Paper>
    </div>
  );
}

export default SplitScreenReversedConfirmationRequiredPage;
