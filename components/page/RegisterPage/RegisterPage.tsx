import { Container } from "../../shared/Container/Container";
import styles from "./RegisterPage.module.scss";
import { Button } from "../../shared/Buttons/Button";
import { PageWapper } from "../../shared/PageWrapper/PageWapper";
import {
  FormField,
  Input,
  PasswordInput,
} from "../../shared/FormSet/FormField";
import { Card } from "../../shared/Card/Card";
import { Link } from "../../shared/Link/Link";

export const RegisterPage = () => {
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
              <Input type="text" placeholder="Enter your first name" />
            </FormField>

            <FormField label="Last Name">
              <Input type="text" placeholder="Enter your last name" />
            </FormField>

            <FormField label="Business Name">
              <Input type="text" placeholder="Enter your business name" />
            </FormField>

            <FormField label="Email">
              <Input type="email" placeholder="Enter your email" />
            </FormField>

            <FormField label="Password">
              <PasswordInput
                placeholder="Enter your password"
                useToggle={true}
              />
            </FormField>

            <FormField label="Confirm Password">
              <PasswordInput
                placeholder="Confirm your password"
                useToggle={true}
              />
            </FormField>

            <p>
              I have read and agreed to the User Agreement and Terms and
              Condition
            </p>

            <Button shape="curved" className={styles.button} size="large">
              Create Account
            </Button>
          </form>
        </Card>
      </Container>
    </PageWapper>
  );
};
