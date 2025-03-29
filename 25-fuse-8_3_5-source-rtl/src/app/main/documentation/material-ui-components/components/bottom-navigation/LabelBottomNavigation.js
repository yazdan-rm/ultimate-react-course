import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
       label="آخرین ها"
        value="recents"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
      label="مورد علاقه ها"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
         label="نزدیکترین ها"
        value="nearby"
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction label="پوشه" value="folder" icon={<FolderIcon />} />
    </BottomNavigation>
  );
}
