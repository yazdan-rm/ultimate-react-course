import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {changeLanguage, selectCurrentLanguage, selectLanguages,} from "app/store/i18nSlice";
import {useAppDispatch, useAppSelector} from "app/store/hooks";

/**
 * The language switcher.
 */
function LanguageSwitcher() {
  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const languages = useAppSelector(selectLanguages);
  const [menu, setMenu] = useState(null);
  const dispatch = useAppDispatch();
  const langMenuClick = (event) => {
    setMenu(event.currentTarget);
  };
  const langMenuClose = () => {
    setMenu(null);
  };

  function handleLanguageChange(lng) {
    dispatch(changeLanguage(lng.id));
    langMenuClose();
  }

  return (
    <>
      <Button className="h-40 w-64" onClick={langMenuClick}>
        <img
          className="mx-4 min-w-20"
          src={`assets/images/flags/${currentLanguage.flag}.svg`}
          alt={currentLanguage.title}
        />

        <Typography
          className="mx-4 font-semibold uppercase"
          color="text.secondary"
        >
          {currentLanguage.id}
        </Typography>
      </Button>

      <Popover
        open={Boolean(menu)}
        anchorEl={menu}
        onClose={langMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
        {languages.map((lng) => (
          <MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
            <ListItemIcon className="min-w-40">
              <img
                className="min-w-20"
                src={`assets/images/flags/${lng.flag}.svg`}
                alt={lng.title}
              />
            </ListItemIcon>
            <ListItemText primary={lng.title} />
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}

export default LanguageSwitcher;
