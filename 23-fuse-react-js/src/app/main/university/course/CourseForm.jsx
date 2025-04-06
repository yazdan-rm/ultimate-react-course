import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";

function CourseForm() {
  return (
    <>
      <Paper
        elevation={4}
        sx={{
          padding: 2,
          margin: 2,
          "& .MuiTextField-root": {
            mx: 0.5,
            my: 1,
            maxWidth: "100%",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "7px",
          },
        }}
      >
        <Stack direction="row" justifyContent="center" alignItems="center">
          <TextField
            fullWidth
            id="course-name"
            label="نام دوره"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="course-code"
            label="کد دوره"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="instructor-name"
            label="نام استاد"
            variant="outlined"
            defaultValue="گروه اساتید"
          />
          <TextField
            fullWidth
            id="capacity"
            label="ظرفیت دوره"
            variant="outlined"
          />
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <TextField
            fullWidth
            id="units"
            label="تعداد واحد درس"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="allowed-genders"
            label="جنسیت های مجاز"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="location"
            label="مکان برگزاری"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="status"
            label="وضعیت دوره"
            variant="outlined"
          />
        </Stack>
        <div className={"flex justify-end mt-4"}>
          <Button
            size="large"
            color="primary"
            variant="contained"
            endIcon={<CheckIcon />}
          >
            ثبت
          </Button>
        </div>
      </Paper>
    </>
  );
}

export default CourseForm;
