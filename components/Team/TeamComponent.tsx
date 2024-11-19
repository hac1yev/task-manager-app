"use client";

import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, LinearProgress, Typography } from "@mui/material";
import AddUser from "./AddUser";
import { useTypedSelector } from "@/store/team-slice";
import { memo, useMemo } from "react";
import TeamUserList from "./TeamUserList";

const TeamComponent = () => {
  const users = useTypedSelector((state) => state.teamReducer.users);
  const isLoading = useTypedSelector((state) => state.teamReducer.isLoading);

  const userColors = useMemo(() => {
    const colors = ["#D18805", "#1A65E9", "#0B8A49", "#D83121", "#6D36D4", "#F72D93"];
    const colorMap = new Map();
    users.forEach((user, index) => {
      const color = colors[index % colors.length];
      colorMap.set(user._id, color);
    });
    return colorMap;
  }, [users]);
  
  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" }, p: 2 }}>
      <AddUser />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Full Name</b>
              </TableCell>
              <TableCell align="left">
                <b>Title</b>
              </TableCell>
              <TableCell align="left">
                <b>Email</b>
              </TableCell>
              <TableCell align="left">
                <b>Role</b>
              </TableCell>
              <TableCell align="left" sx={{ width: 120 }}>
                <b>Status</b>
              </TableCell>
              <TableCell sx={{ width: 200 }}></TableCell>
            </TableRow>
          </TableHead>
          <TeamUserList users={users} userColors={userColors} />
        </Table>
      </TableContainer>
      {users.length === 0 && isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

      {users.length === 0 && !isLoading && (
        <Typography className="flex-center" variant='h6' sx={{ mt: 1 }}>
          There is no user!
        </Typography>
      )}
    </Box>
  );
};

const MemoizationTeamComponent = memo(TeamComponent);

export default MemoizationTeamComponent;