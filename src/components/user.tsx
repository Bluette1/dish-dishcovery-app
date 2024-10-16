// user.tsx
import { User } from "next-auth";
import React from "react";

interface UserProps {
  user?: User;
}

const UserContent: React.FC<UserProps> = ({ user }) => {
  if (!user) {
    return <div>Please log in.</div>;
  }
  const {
    user: { name },
  } = user;
  return (
    <div className="my-2">
      <div>Welcome, {name}</div>
    </div>
  );
};

export default UserContent;
