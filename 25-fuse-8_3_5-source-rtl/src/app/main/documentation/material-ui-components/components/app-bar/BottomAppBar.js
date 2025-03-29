import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

const messages = [
  {
    id: 1,
    primary: 'این هفته ناهار بخوریم؟',
    secondary: "من این هفته در محله خواهم بود. بیا یه لقمه بخوریم",
    person: '/material-ui-static/images/avatar/5.jpg',
  },
  {
    id: 2,
    primary: 'هدیه تولد',
    secondary: `آیا پیشنهادی برای هدیه خوب برای جان در سالگرد کارش دارید؟ من واقعا گیج  شدم و دوست دارم  نظر شما رو بدونم`,
    person: '/material-ui-static/images/avatar/1.jpg',
  },
  {
    id: 3,
    primary: 'دستور غذا برای امتحان',
    secondary: 'من دارماین دستور  غذای جدید باربیکیو رو امتحان میکنم.فکر کنم عالی بشه!',
    person: '/material-ui-static/images/avatar/2.jpg',
  },
  {
    id: 4,
    primary: 'Yes!',
    secondary: 'من بلیط های ReactConf را برای امسال دارم.',
    person: '/material-ui-static/images/avatar/3.jpg',
  },
  {
    id: 5,
    primary: "وقت دکتر",
    secondary: 'نوبت من برای دکتر برای شنبه آینده موکول شد.',
    person: '/material-ui-static/images/avatar/4.jpg',
  },
  {
    id: 6,
    primary: 'بحث',
    secondary: `منوهایی که توسط نوار برنامه پایین ایجاد می‌شوند (مانند کشوی پیمایش پایین یا منوی سرریز) به‌صورت برگه‌های پایینی در ارتفاعی بالاتر از نوار باز می‌شوند.`,
    person: '/material-ui-static/images/avatar/5.jpg',
  },
  {
    id: 7,
    primary: 'باربیکیو تابستانی',
    secondary: ` کسی می خواهد این آخر هفته غذای آشپزی داشته باشد؟ من به تازگی برای حیاط خلوتم مبلمان گرفتم و دوست دارم کباب پز را راه بندازم .`,
    person: '/material-ui-static/images/avatar/1.jpg',
  },
];

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function BottomAppBar() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          صندوق ورودی
        </Typography>
        <List sx={{ mb: 2 }}>
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              {id === 1 && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  امروز
                </ListSubheader>
              )}

              {id === 3 && (
                <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                  دیروز
                </ListSubheader>
              )}

              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <StyledFab color="secondary" aria-label="add">
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
