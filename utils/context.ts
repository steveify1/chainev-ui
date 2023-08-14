import React from "react";

interface AuthData {
  uuid?: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  email?: string;
  token?: string;
}

export const AuthContext = React.createContext<AuthData>({});
