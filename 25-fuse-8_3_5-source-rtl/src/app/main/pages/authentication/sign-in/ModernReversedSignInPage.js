import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('باید یک ایمیل معتبر وارد کنید').required('باید یک ایمیل وارد کنید'),
  password: yup
    .string()
    .required('لطفا رمز عبور خود را وارد کنید.')
    .min(8, 'رمز عبور خیلی کوتاه است - باید حداقل 8 کاراکتر باشد.'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};

function ModernReversedSignInPage() {
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
             فیوز به توسعه دهندگان کمک می کند تا داشبوردهای سازمان یافته و کدگذاری شده ای پر از ماژول های زیبا و غنی بسازند. به ما بپیوندید و از همین امروز شروع به ساخت اپلیکیشن خود کنید.
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

        <div className="w-full sm:w-auto py-32 px-16 sm:p-48 md:p-64 rtl:border-r-1 ltr:border-l-1">
          <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
            <img className="w-48" src="assets/images/logo/logo.svg" alt="قالب ادمین ری اکتی Fuse" />

            <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
              ورود به سامانه
            </Typography>
            <div className="flex items-baseline mt-2 font-medium">
              <Typography>حساب کاربری ندارید؟</Typography>
              <Link className="ml-4" to="/sign-up">
                ثبت نام
              </Link>
            </div>

            <form
              name="loginForm"
              noValidate
              className="flex flex-col justify-center w-full mt-32"
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
                    autoFocus
                    type="email"
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-24"
                    label="رمزعبور"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    required
                    fullWidth
                  />
                )}
              />

              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormControlLabel
                        label="مرا به خاطر بسپار"
                        control={<Checkbox size="small" {...field} />}
                      />
                    </FormControl>
                  )}
                />

                <Link className="text-md font-medium" to="/pages/auth/forgot-password">
                  فراموشی رمز؟
                </Link>
              </div>

              <Button
                variant="contained"
                color="secondary"
                className=" w-full mt-16"
                aria-label="ورود به سامانه"
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type="submit"
                size="large"
              >
                ورود به سامانه
              </Button>

              <div className="flex items-center mt-32">
                <div className="flex-auto mt-px border-t" />
                <Typography className="mx-8" color="text.secondary">
                  یا ادامه با
                </Typography>
                <div className="flex-auto mt-px border-t" />
              </div>

              <div className="flex items-center mt-32 space-x-16">
                <Button variant="outlined" className="flex-auto">
                  <FuseSvgIcon size={20} color="action">
                    feather:facebook
                  </FuseSvgIcon>
                </Button>
                <Button variant="outlined" className="flex-auto">
                  <FuseSvgIcon size={20} color="action">
                    feather:twitter
                  </FuseSvgIcon>
                </Button>
                <Button variant="outlined" className="flex-auto">
                  <FuseSvgIcon size={20} color="action">
                    feather:github
                  </FuseSvgIcon>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default ModernReversedSignInPage;
