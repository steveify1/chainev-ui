import { useState } from "react";
import { LoginPage } from "../components/page/LoginPage/LoginPage";
import { HomePage } from "../components/page/HomePage/HomePage";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return <>{isLoggedIn ? <HomePage /> : <LoginPage />}</>;
}
