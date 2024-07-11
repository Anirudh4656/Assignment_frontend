import React, { useEffect, useState } from "react";
import {
  useUsersQuery
} from "../../Services/adminapi";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  setUsers,
} from "../../Store/reducers/adminReducers";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import AllUsers from "./AllUsers";
import Layout from "../../Layout/AdminPanel";

interface IUser {
  id: string;
  username: string;
  email: string;
  role: "ADMIN" | "USER";
  isBlocked: boolean;
}

const index: React.FC = () => {
  const { data: Users, refetch: refetchUsers } = useUsersQuery();
  const dispatch = useDispatch<AppDispatch>();
  const admin = useSelector((state: RootState) => state.admin.users);
  console.log("admmin", admin);
  const [isUserToggled, setIsUserToggled] = useState<boolean>(true);
  //backend user authentication if block condition
  //why state update

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        if (Users) {
          console.log("check rendering of component", Users);

          const transformedUsers: IUser[] = Users.data.map((user: any) => ({
            id: user._id,
            username: user.username,
            role: user.role,
            email: user.email,
            isBlocked: user.isBlocked,
          }));

          dispatch(setUsers({ user: transformedUsers }));
          console.log("allusers", transformedUsers);
        }
      } catch (error: any) {
        console.log("erroris", error.message);
      }
    };
    fetchDiscussions();
  }, [isUserToggled, Users, refetchUsers]);

  console.log("usestate", isUserToggled);

  return (
    <Layout>
      <Paper>
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admin && admin.length > 0 ? (
              admin.map((getUser: any) => (
                <AllUsers
                  key={getUser.id}
                  a={getUser}
                  Toggled={setIsUserToggled}
                />
              ))
            ) : (
              <p>No Users Found.</p>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Layout>
  );
};

export default index;
