import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function CourseForm() {
  return (
    <>
      <Paper
        elevation={4}
        sx={{
          padding: 2,
          margin: 2,
          "& .MuiTextField-root": {
            m: 0.5,
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
          <FormControl fullWidth>
            <InputLabel id="allowed-genders-label">جنسیت های مجاز</InputLabel>
            <Select
              labelId="allowed-genders-label"
              id="allowed-genders"
              // value={age}
              label="جنسیت های مجاز"
              // onChange={handleChange}
            >
              <MenuItem value={1}>مرد</MenuItem>
              <MenuItem value={2}>زن</MenuItem>
              <MenuItem value={3}>مختلط</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            id="location"
            label="مکان برگزاری"
            variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel id="status-label">وضعیت دوره</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              // value={age}
              label="وضعیت دوره"
              // onChange={handleChange}
              variant="outlined"
            >
              <MenuItem value={1}>فعال</MenuItem>
              <MenuItem value={0}>غیر فعال</MenuItem>
            </Select>
          </FormControl>
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
