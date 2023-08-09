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

export const LoginPage = () => {
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
              <Input type="email" placeholder="Enter your email" />
            </FormField>

            <FormField label="Password">
              <PasswordInput
                placeholder="Enter your password"
                useToggle={true}
              />
            </FormField>

            <Link href="/">
              <Button shape="curved" className={styles.button} size="large">
                Login
              </Button>
            </Link>
          </form>
        </Card>
      </Container>
    </PageWapper>
  );
};
