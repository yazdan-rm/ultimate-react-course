import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

function CourseForm() {
  return (
    <div>
      {/*<Button*/}
      {/*  onClick={() =>*/}
      {/*    dispatch(showMessage({ message: "عملیات باموفقیت انجام شد." }))*/}
      {/*  }*/}
      {/*>*/}
      {/*  Toaster-bottom-left*/}
      {/*</Button>*/}
      <Paper elevation={4} sx={{ padding: 2, margin: 2 }}>
        <Typography variant="h6">This is a Paper Component</Typography>
        <Typography>This component has a shadow!</Typography>
      </Paper>

      <Stack direction="row" spacing={2} sx={{ margin: 2 }}>
        <Button variant="contained">Left</Button>
        <Button variant="contained">Middle</Button>
        <Button variant="contained">Right</Button>
      </Stack>

      <Container maxWidth="">
        <h1>Welcome to My Page</h1>
        <p>This content is centered and has a max width.</p>
      </Container>

      <Box
        component="form"
        sx={{
          margin: 2,
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          <TextField
            error
            id="outlined-error"
            label="Error"
            defaultValue="Hello World"
          />
          <TextField
            error
            id="outlined-error-helper-text"
            label="Error"
            defaultValue="Hello World"
            helperText="Incorrect entry."
          />
        </div>
        <div>
          <TextField
            error
            id="filled-error"
            label="Error"
            defaultValue="Hello World"
            variant="filled"
          />
          <TextField
            error
            id="filled-error-helper-text"
            label="Error"
            defaultValue="Hello World"
            helperText="Incorrect entry."
            variant="filled"
          />
        </div>
        <div>
          <TextField
            error
            id="standard-error"
            label="Error"
            defaultValue="Hello World"
            variant="standard"
          />
          <TextField
            error
            id="standard-error-helper-text"
            label="Error"
            defaultValue="Hello World"
            helperText="Incorrect entry."
            variant="standard"
          />
        </div>
        <div>
          <DatePicker
            onChange={(e) => console.log(e)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
            localeText={{
              todayButtonLabel: "امروز",
              clearButtonLabel: "پاک کردن",
            }}
            slotProps={{
              textField: {
                id: "exam-date",
                label: "تاریخ امتحان",
                variant: "outlined",
              },
              actionBar: {
                actions: ["today", "clear"],
              },
            }}
          />

          <TimePicker
            onChange={(e) => console.log(e)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
            localeText={{
              todayButtonLabel: "امروز",
              clearButtonLabel: "پاک کردن",
            }}
            slotProps={{
              textField: {
                id: "exam-date",
                label: "زمان امتحان",
                variant: "outlined",
              },
              actionBar: {
                actions: ["today", "clear"],
              },
            }}
          />
        </div>
      </Box>
    </div>
  );
}

export default CourseForm;
