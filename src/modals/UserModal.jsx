import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function UserModal({
  open,
  handleClose,
  handleAddNewUser,
  editEntry,
  handleUpdateUser,
}) {
  const [userData, setUserData] = useState({
    title: "",
    body: "",
    userId: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    body: "",
    userId: "",
  });

  useEffect(() => {
    console.log("editEntry", editEntry);
    editEntry != null
      ? setUserData(editEntry)
      : setUserData({ title: "", body: "", userId: "" });
  }, [editEntry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = () => {
    let valid = true;
    const newErrors = { title: "", body: "", userId: "" };

    if (!userData.title) {
      newErrors.title = "Title is required";
      valid = false;
    }

    if (!userData.body) {
      newErrors.body = "Body is required";
      valid = false;
    }

    if (!userData.userId) {
      newErrors.userId = "User ID is required";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      if (editEntry != null) {
        handleUpdateUser(userData);
      } else {
        const newUser = {
          id: Math.floor(Math.random() * 1000),
          ...userData,
        };
        handleAddNewUser(newUser);
        handleClose();
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {editEntry != null ? "Edit User" : "Add New User"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="User ID"
          name="userId"
          value={userData.userId}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.userId}
          helperText={errors.userId}
        />
        <TextField
          label="Title"
          name="title"
          value={userData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Body"
          name="body"
          value={userData.body}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.body}
          helperText={errors.body}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>
          {editEntry != null ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserModal;
