import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Button,
  TextField,
  TableSortLabel,
} from "@mui/material";
import UserModal from "../modals/UserModal";

function DataTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  const handleClickOpen = () => {
    setEditEntry(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNewUser = (newUser) => {
    setData((prevData) => [newUser, ...prevData]);
    setFilteredData((prevFiltered) => [newUser, ...prevFiltered]);
  };
  const handleUpdateUser = (editUser) => {
    console.log(editUser, "uodate");
    setData(data.map((item) => (item.id == editUser.id ? editUser : item)));
    setFilteredData(
      filteredData.map((item) => (item.id == editUser.id ? editUser : item))
    );
    handleClose();
  };

  const handleEditButton = (row) => {
    setEditEntry(row);
    setOpen(true);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = data.filter((row) =>
      row.title.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
    setPage(0);
  };

  const sortData = (array, comparator) => {
    return array.sort(comparator);
  };

  const comparator = (a, b) => {
    if (orderBy === "id") {
      if (order === "desc") {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    }
    if (orderBy === "title") {
      if (order === "desc") {
        return b.title.localeCompare(a.title);
      } else {
        return a.title.localeCompare(b.title);
      }
    }
    return 0;
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingLeft: 0,
        paddingRight: 5,
        paddingTop: 15,
      }}
    >
      <UserModal
        open={open}
        editEntry={editEntry}
        handleClose={handleClose}
        handleAddNewUser={handleAddNewUser}
        handleUpdateUser={handleUpdateUser}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        width="100%"
      >
        <h1>Model Library</h1>
        <TextField
          label="Search by Title"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: 400 }}
        />
        <Button
          onClick={() => {
            handleClickOpen();
          }}
          variant="contained"
          color="primary"
        >
          + Create New Model
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#1E1B4B",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? order : "asc"}
                  onClick={() => handleRequestSort("id")}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#1E1B4B",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                <TableSortLabel
                  active={orderBy === "title"}
                  direction={orderBy === "title" ? order : "asc"}
                  onClick={() => handleRequestSort("title")}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#1E1B4B",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                User ID
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#1E1B4B",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: " #1E1B4B",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortData(filteredData, comparator)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell style={{ color: "green" }}>Active</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        handleEditButton(row);
                      }}
                      //
                      sx={{ backgroundColor: "#4F46E5", color: "#FFF" }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 20]}
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
}

export default DataTable;
