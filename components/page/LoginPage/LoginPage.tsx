import { Container } from "../../shared/Container/Container";
import styles from "./LoginPage.module.scss";
import { Button } from "../../shared/Buttons/Button";
import { PageWapper } from "../../shared/PageWrapper/PageWapper";
import {
  FormField,
  Input,
  PasswordInput,
} from "../../shared/FormSet/FormField";
import { Card } from "../../shared/Card/Card";
import { Link } from "../../shared/Link/Link";
import { useState } from "react";
import api from "../../../utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useLocalStorage from "use-local-storage";
import { navigator } from "../../../utils/navigator.utils";

const initialFormData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e: any) => {
    const {
      target: { name, value },
    } = e;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFormSubmission = async (e: any) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await api.login(formData);
      navigator.localStorage.set("auth", JSON.stringify(response.data));
      navigator.localStorage.set("token", response.data.token);

      router.push("/");
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }

    setIsLoading(false);
  };

  return (
    <PageWapper>
      <Container>
        <Card className={styles.loginCard}>
          <div className={styles.header}>
            <h3 className={styles.heading}>Login it to your account.</h3>
            <p className={styles.subheading}>
              <span>You don't have an account? </span>
              <Link href={"/register"} className={styles.link}>
                Create account
              </Link>
            </p>
          </div>

          <form>
            <FormField label="Email">
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField label="Password">
              <PasswordInput
                name="password"
                placeholder="Enter your password"
                useToggle={true}
                value={formData.password}
                onChange={handleInputChange}
              />
            </FormField>

            <Button
              shape="curved"
              className={styles.button}
              size="large"
              onClick={handleFormSubmission}
            >
              {isLoading ? "Please wait" : "Login"}
            </Button>
          </form>
        </Card>
      </Container>
    </PageWapper>
  );
};
