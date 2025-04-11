import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import { useAppDispatch, useAppSelector } from "app/store/hooks.js";
import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from "../UniversityApi.js";
import { refreshAgGrid, selectDataObject } from "../universitySlice.js";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice.js";
import { useEffect } from "react";

const defaultValues = {
  id: "",
  courseCode: "",
  units: "",
  allowedGenders: "",
  courseName: "",
  instructorName: "",
  capacity: "",
  status: "",
  location: "",
};

const schema = z.object({
  id: z.any().optional(),
  courseCode: z.string().min(1, "مقدار فیلد کد دوره اجباریست"),
  units: z.coerce
    .number()
    .min(1, "حداقل مقدار 1 می باشد")
    .max(3, "حداکثر مقدار 3 می باشد"),
  allowedGenders: z.number({
    required_error: "مقدار فیلد جنسیت مجاز اجباریست",
    invalid_type_error: "مقدار وارد شده درست نیست",
  }),
  instructorName: z.string(),
  courseName: z.string().min(1, "مقدار فیلد نام دوره اجباریست"),
  capacity: z.coerce
    .number({ invalid_type_error: "عدد وارد کنید" })
    .int()
    .min(10, "حداقل مقدار 10 است"),
  status: z.number({
    required_error: "مقدار فیلد وضعیت دوره اجباریست",
    invalid_type_error: "مقدار وارد شده درست نیست",
  }),
  location: z.string().min(1, "مقدار فیلد مکان دوره اجباریست"),
});

function CourseForm() {
  const dispatch = useAppDispatch();
  const [createCourse] = useCreateCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const dataForUpdate = useAppSelector(selectDataObject);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "all",
  });

  useEffect(() => {
    reset(dataForUpdate);
  }, [dataForUpdate]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      instructorName: data.instructorName?.trim() || "گروه اساتید",
    };

    if (payload.id) {
      updateCourse(data)
        .unwrap()
        .then((data) => {
          dispatch(showMessage({ message: data.message }));
        })
        .catch((e) =>
          dispatch(
            showMessage({ message: e.response.data.message, variant: "error" }),
          ),
        );
    } else {
      createCourse(payload)
        .unwrap()
        .then((data) => {
          dispatch(showMessage({ message: data.message }));
        })
        .catch((e) =>
          dispatch(
            showMessage({ message: e.response.data.message, variant: "error" }),
          ),
        );
    }

    reset(defaultValues);
    dispatch(refreshAgGrid());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          margin: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          "& .MuiTextField-root": {
            maxWidth: "100%",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "7px",
            fontWeight: 700,
          },
          "& .MuiInputLabel-root": {
            fontWeight: 700,
          },
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="courseName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="نام دوره"
                  error={!!errors.courseName}
                  helperText={errors.courseName?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="courseCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="کد دوره"
                  error={!!errors.courseCode}
                  helperText={errors.courseCode?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="instructorName"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="نام استاد" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="capacity"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="ظرفیت دوره"
                  type="number"
                  error={!!errors.capacity}
                  helperText={errors.capacity?.message}
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="units"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="تعداد واحد درس"
                  type="number"
                  error={!!errors.units}
                  helperText={errors.units?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="allowedGenders"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.allowedGenders}>
                  <InputLabel id="allowed-genders-label">
                    جنسیت های مجاز
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="allowed-genders-label"
                    label="جنسیت های مجاز"
                  >
                    <MenuItem value={1}>مرد</MenuItem>
                    <MenuItem value={2}>زن</MenuItem>
                    <MenuItem value={3}>مختلط</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors.allowedGenders?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="مکان برگزاری"
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.status}>
                  <InputLabel id="status-label">وضعیت دوره</InputLabel>
                  <Select {...field} labelId="status-label" label="وضعیت دوره">
                    <MenuItem value={1}>فعال</MenuItem>
                    <MenuItem value={0}>غیر فعال</MenuItem>
                  </Select>
                  <FormHelperText>{errors.status?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

        <div className="flex justify-end mt-2">
          <Button
            size="large"
            color="primary"
            variant="contained"
            type="submit"
            endIcon={<CheckIcon />}
          >
            ثبت
          </Button>
        </div>
      </Paper>
    </form>
  );
}

export default CourseForm;
