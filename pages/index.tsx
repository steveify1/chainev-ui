import { useState } from "react";
import { LoginPage } from "../components/page/LoginPage/LoginPage";
import { Dashboard } from "../components/shared/Dashboard/Dashboard";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      {isLoggedIn ? <Dashboard>{"Hello dashboard"}</Dashboard> : <LoginPage />}
    </>
  );
}
