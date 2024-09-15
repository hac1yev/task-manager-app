"use client";

import { TableBody } from "@mui/material";
import TeamUserItem from "./TeamUserItem";
import { memo } from "react";

const TeamUserList = ({ users, userColors }: { users: UserType[], userColors: Map<any, any> }) => {
  return (
    <TableBody className="users-table">
      {users.map((user: UserType) => (
        <TeamUserItem key={user._id} users={users} user={user} color={userColors.get(user._id)} />
      ))}
    </TableBody>
  );
};

export default memo(TeamUserList);