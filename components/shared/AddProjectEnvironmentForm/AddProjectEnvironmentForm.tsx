import { useContext, useState } from "react";
import {
  CheckboxInput,
  FileInput,
  FormField,
  Input,
  NetworkTypeRadioInput,
} from "../FormSet/FormField";
import { Button } from "../Buttons";
import styles from "./AddProjectEnvironmentForm.module.scss";
import api from "../../../utils/api";
import { toast } from "react-toastify";
import { Scroller } from "../Scroller/Scroller";
import { useRouter } from "next/router";

const initialFormData = {
  address: "",
  networkType: "",
  webhookUrl: "",
};

interface AddProjectEnvironmentFormProps {
  projectId: string;
  existingEnvironmentNetworkTypes: string[];
}

export const AddProjectEnvironmentForm = (
  props: AddProjectEnvironmentFormProps
) => {
  const router = useRouter();
  const [formFields, setFormFields] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    const {
      target: { name, value },
    } = e;
    setFormFields((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFormSubmission = async (e: any) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await api.addProjectEnvironment(
        props.projectId,
        formFields
      );
      router.reload();
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }

    setIsLoading(false);
  };

  return (
    <form>
      <Scroller maxHeight={550}>
        <FormField label="Network Type">
          <NetworkTypeRadioInput
            name="networkType"
            onChange={handleInputChange}
            existingNetworkTypes={props.existingEnvironmentNetworkTypes}
          />
        </FormField>

        <FormField label="Address">
          <Input
            placeholder="Enter Address"
            name="address"
            value={formFields.address}
            onChange={handleInputChange}
          />
        </FormField>

        <FormField label="Webhook URL">
          <Input
            placeholder="Enter webhook url"
            name="webhookUrl"
            value={formFields.webhookUrl}
            onChange={handleInputChange}
          />
        </FormField>
      </Scroller>

      <Button
        shape="curved"
        size="large"
        className={styles.submitButton}
        onClick={handleFormSubmission}
      >
        <span>{isLoading ? "Please wait.." : "Create Project"}</span>
      </Button>
    </form>
  );
};
