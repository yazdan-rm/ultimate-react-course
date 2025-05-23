import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FuseCountdown from '@fuse/core/FuseCountdown';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('باید یک ایمیل معتبر وارد کنید').required('باید یک ایمیل وارد کنید'),
});

const defaultValues = {
  email: '',
};

function ModernComingSoonPage() {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit() {
    reset(defaultValues);
  }

  return (
    <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0 md:p-32">
      <Paper className="flex w-full sm:w-auto min-h-full sm:min-h-auto md:w-full md:max-w-6xl rounded-0 sm:rounded-2xl sm:shadow overflow-hidden">
        <div className="w-full sm:w-auto py-32 px-16 sm:p-48 md:p-64 ltr:border-r-1 rtl:border-l-1">
          <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
            <img className="w-48" src="assets/images/logo/logo.svg" alt="قالب ادمین ری اکتی Fuse" />

            <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            تقریبا چیزی نمونده !
            </Typography>
            <Typography className="mt-2">
            آیا می خواهید زمانی که ما آماده شدیم به شما اطلاع داده شود؟ در قسمت زیر ثبت نام کنید تا بتوانیم در مورد راه اندازی به شما اطلاع دهیم!
    =
            </Typography>

            <div className="flex flex-col items-center py-48">
              <FuseCountdown endDate="2024-07-28" />
            </div>

            <form
              name="comingSoonForm"
              noValidate
              className="flex flex-col justify-center w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="آدرس ایمیل"
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Button
                variant="contained"
                color="secondary"
                className=" w-full mt-4"
                aria-label="Register"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
               وقتی اماده شد، به من خبر بده!
              </Button>

              <Typography className="mt-32 text-md font-medium" color="text.secondary">
              این یک اشتراک خبرنامه نیست. وقتی شروع به کار کردیم یک ایمیل برای شما ارسال می کنیم و سپس از لیست حذف خواهید شد.
              </Typography>
            </form>
          </div>
        </div>

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
      </Paper>
    </div>
  );
}

export default ModernComingSoonPage;
