import { useContext, useState } from "react";
import {
  CheckboxInput,
  FileInput,
  FormField,
  Input,
  NetworkTypeRadioInput,
} from "../FormSet/FormField";
import { Button } from "../Buttons";
import styles from "./CreateProjectForm.module.scss";
import api from "../../../utils/api";
import { toast } from "react-toastify";
import { Scroller } from "../Scroller/Scroller";
import { useRouter } from "next/router";
import { CustomFormProps } from "../FormSet";

const initialFormData = {
  name: "",
  address: "",
  networkType: "",
  abi: "",
  eventNames: [],
  webhookUrl: "",
};

export const CreateProjectForm = (props: CustomFormProps) => {
  const router = useRouter();
  const [formFields, setFormFields] = useState(initialFormData);
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
      toast("No JSON file detected");
    } else {
      const fileContentAsJSONString = await file.text();
      const parsed = JSON.parse(fileContentAsJSONString);

      if (!Array.isArray(parsed)) {
        return toast("Upload your ABI array as a JSON file", {
          type: "error",
        });
      }

      const parsedEventNames = parseAvailableEventNames(parsed);

      if (!parsedEventNames.length) {
        return toast("No events found in ABI", { type: "error" });
      }
      handleAbiFileInputReset(e);
      handleInputChange({ target: { name, value: fileContentAsJSONString } });
      setAvailableEventNames(parsedEventNames);
    }
  };

  const handleAbiFileInputReset = async (e: any) => {
    const {
      target: { name },
    } = e;
    handleInputChange({ target: { name, value: null } });
    setAvailableEventNames([]);

    setFormFields((prev) => {
      return { ...prev, eventNames: [] };
    });
  };

  const handleSuccess = (data: any) => {
    if (typeof props.onSuccess === "function") {
      props.onSuccess(data);
    }
  };

  const setLoadingState = (value: boolean) => {
    setIsLoading(value);

    if (typeof props.onProcessingStateChange === "function") {
      props.onProcessingStateChange(value);
    }
  };

  const handleFormSubmission = async (e: any) => {
    e.preventDefault();

    if (isLoading) return;
    setLoadingState(true);

    try {
      const response = await api.createProject(formFields);
      handleSuccess(response.data);
      router.push(`/projects/${response.data.uuid}`);
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }

    setLoadingState(false);
  };

  return (
    <form>
      <Scroller maxHeight={550}>
        <FormField label="Unique project name">
          <Input
            placeholder="Enter unique project name"
            name="name"
            value={formFields.name}
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

        <br />
        <h4>Environment configuration</h4>
        <br />

        <FormField label="Network Type">
          <NetworkTypeRadioInput
            name="networkType"
            onChange={handleInputChange}
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
        disabled={isLoading}
      >
        <span>{isLoading ? "Please wait.." : "Create Project"}</span>
      </Button>
    </form>
  );
};
