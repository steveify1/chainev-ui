import { useState } from "react";
import {
  CheckboxInput,
  FileInput,
  FormField,
  Input,
  NetworkTypeRadioInput,
} from "./FormField";
import { navigator } from "../../../utils/navigator.utils";
import { Button } from "../Buttons";
import styles from "./CreateProjectForm.module.scss";
import api from "../../../utils/api";

interface CreateProjectInput {
  name?: string;
  address?: string;
  networkType?: string;
  abi?: string;
  eventNames?: string[];
  webhookUrl?: string;
}

export const CreateProjectForm = () => {
  const [formFields, setFormFields] = useState<CreateProjectInput>({});
  const [availableEventNames, setAvailableEventNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const parseAvailableEventNames = (parsedAbi: any[]) => {
    return parsedAbi.filter((i) => i.type === "event").map((i) => i.name);
  };

  const handleInputChange = (e: any) => {
    const {
      target: { name, value },
    } = e;
    setFormFields((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCheckboxInputChange = (e: any) => {
    const {
      target: { name, selected },
    } = e;
    setFormFields((prev) => {
      return { ...prev, [name]: selected };
    });
  };

  const handleAbiFileInputChange = async (e: any) => {
    const {
      target: { name, files },
    } = e;
    const file = files[0];

    if (file?.type !== "application/json") {
      console.log("No JSON file detected");
    } else {
      const fileContentAsString = await file.text();
      handleInputChange({ target: { name, value: fileContentAsString } });
      const parsed = JSON.parse(fileContentAsString);
      if (!Array.isArray(parsed)) {
        navigator.notify("I no like stress. Upload only your ABI as JSON");
        return;
      }

      setAvailableEventNames(parseAvailableEventNames(parsed));
    }
  };

  const handleAbiFileInputReset = async (e: any) => {
    const {
      target: { name },
    } = e;
    handleInputChange({ target: { name, value: null } });
    setAvailableEventNames([]);
  };

  const handleFormSubmission = async (e: any) => {
    e.preventDefault();
    console.log(formFields);

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await api.createProject(formFields);
      console.log(response);
    } catch (error) {
      // TODO: Handle error
    }

    setIsLoading(false);
  };

  return (
    <form>
      <FormField label="Unique project name">
        <Input
          placeholder="Enter unique project name"
          name="name"
          value={formFields.name}
          onChange={handleInputChange}
        />
      </FormField>

      <FormField label="Network Type">
        <NetworkTypeRadioInput
          name="networkType"
          onChange={handleInputChange}
        />
      </FormField>

      <FormField label="ABI">
        <FileInput
          placeholder={"Upload ABI as .json file"}
          name="abi"
          accept=".json"
          onChange={handleAbiFileInputChange}
          onReset={handleAbiFileInputReset}
        />
      </FormField>

      <FormField label="Select Events">
        {availableEventNames.length ? (
          <CheckboxInput
            name="eventNames"
            value={formFields.address}
            onChange={handleCheckboxInputChange}
            options={availableEventNames.map((e, i) => ({
              label: e,
              value: e,
            }))}
          />
        ) : (
          <p style={{ textAlign: "center", opacity: 0.5 }}>
            Upload ABI file to select events
          </p>
        )}
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
