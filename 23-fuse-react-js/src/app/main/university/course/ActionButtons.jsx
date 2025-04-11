import { refreshAgGrid, updateData } from "../universitySlice.js";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useAppDispatch } from "app/store/hooks.js";
import { useDeleteCourseMutation } from "../UniversityApi.js";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice.js";

function ActionButtons({ data }) {
  const dispatch = useAppDispatch();
  const [removeItem] = useDeleteCourseMutation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleEdit = () => {
    dispatch(updateData(data));
    handleClose();
  };

  const handleDelete = () => {
    removeItem(data.id)
      .unwrap()
      .then((data) => {
        dispatch(showMessage({ message: data.message }));
      })
      .catch((e) =>
        dispatch(
          showMessage({ message: e.response.data.message, variant: "error" }),
        ),
      );
    dispatch(refreshAgGrid());
    handleClose();
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button className="flex gap-2 justify-center" onClick={handleClick}>
        <MoreVertRoundedIcon fontSize="medium" />
      </Button>
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem className="flex gap-2 justify-around" onClick={handleEdit}>
          <p>ویرایش</p>
          <EditOutlinedIcon className="text-blue-500" fontSize="medium" />
        </MenuItem>
        <MenuItem className="flex gap-2 justify-around" onClick={handleDelete}>
          <p>حذف</p>
          <DeleteIcon className="text-red-500" fontSize="medium" />
        </MenuItem>
      </Menu>
    </>
  );
}

export default ActionButtons;
