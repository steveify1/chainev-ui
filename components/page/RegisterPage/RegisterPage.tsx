import { Container } from "../../shared/Container/Container";
import styles from "./RegisterPage.module.scss";
import { Button } from "../../shared/Buttons/Button";
import { PageWapper } from "../../shared/PageWrapper/PageWapper";
import {
  CheckboxInput,
  FormField,
  Input,
  PasswordInput,
} from "../../shared/FormSet/FormField";
import { Card } from "../../shared/Card/Card";
import { Link } from "../../shared/Link/Link";
import { useRouter } from "next/router";
import { useState } from "react";
import api from "../../../utils/api";
import { navigator } from "../../../utils/navigator.utils";
import { toast } from "react-toastify";

const initialFormState = {
  firstName: "",
  lastName: "",
  businessName: "",
  email: "",
  password: "",
};

export const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState(initialFormState);
  const [isAgreedToTerms, setIsAgreedToTerms] = useState<number>(0);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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
      await api.register(formData);
      router.push("/login");
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }

    setIsLoading(false);
  };

  return (
    <PageWapper>
      <Container>
        <Card className={styles.registerCard}>
          <div className={styles.header}>
            <h3 className={styles.heading}>Create an account.</h3>
            <p className={styles.subheading}>
              <span>Already have an account? </span>
              <Link href={"/"} className={styles.link}>
                Login
              </Link>
            </p>
          </div>

          <form>
            <FormField label="First Name">
              <Input
                type="text"
                placeholder="Enter your first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField label="Last Name">
              <Input
                type="text"
                placeholder="Enter your last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField label="Business Name">
              <Input
                type="text"
                placeholder="Enter your business name"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField label="Email">
              <Input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField label="Password">
              <PasswordInput
                placeholder="Enter your password"
                useToggle={true}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </FormField>

            <FormField label="Confirm Password">
              <PasswordInput
                placeholder="Confirm your password"
                useToggle={true}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e.target.value)}
              />
              <p className={styles.passwordCheckMessage}>
                {confirmPassword && formData.password !== confirmPassword ? (
                  <span>Passwords do not match</span>
                ) : null}
              </p>
            </FormField>

            <FormField>
              <CheckboxInput
                name="agreement"
                onChange={(e: any) =>
                  setIsAgreedToTerms(e.target.selected?.length)
                }
                options={[
                  {
                    label:
                      "I have read and agreed to the User Agreement and Terms and Condition",
                    value: true,
                  },
                ]}
              />
            </FormField>

            <Button
              shape="curved"
              className={styles.button}
              size="large"
              onClick={handleFormSubmission}
              disabled={isLoading || !isAgreedToTerms}
            >
              Create Account
            </Button>
          </form>
        </Card>
      </Container>
    </PageWapper>
  );
};
