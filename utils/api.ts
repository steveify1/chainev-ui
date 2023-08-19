import axios from "axios";
import { navigator } from "./navigator.utils";

interface LoginInput {
  email: string;
  password: string;
}

interface CreateProjectInput {
  name: string;
  abi: string;
  eventNames: string[];
  networkType: string;
  address: string;
  webhookUrl: string;
}

interface AddProjectEnvironmentInput {
  networkType: string;
  address: string;
  webhookUrl: string;
}

class API {
  private baseUrl = "http://localhost:7000/v1";

  handleError(error: any) {
    if (error.response?.data) {
      if (error.response.status === 403) {
        throw new Error("You are not authorized to access this resource");
      }

      if (error.response.status === 400) {
        const { message, errors } = error.response.data;
        throw new Error(errors ? errors[0] : message);
      }

      throw new Error(error.response.data?.message);
    }

    throw new Error("Something went wrong, please try again later");
  }

  resolveHeaders() {
    const token = navigator.localStorage.get("token");

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async login(body: LoginInput) {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/login`, body);
      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async createProject(body: CreateProjectInput) {
    try {
      const response = await axios.post(`${this.baseUrl}/projects`, body, {
        headers: this.resolveHeaders(),
      });

      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async getProjects(query: any = {}) {
    try {
      const response = await axios.get(`${this.baseUrl}/projects`, {
        headers: this.resolveHeaders(),
        params: { ...query },
      });

      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async getProject(projectId: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/projects/${projectId}`,
        {
          headers: this.resolveHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async addProjectEnvironment(
    projectId: string,
    body: AddProjectEnvironmentInput
  ) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/projects/${projectId}/environments`,
        body,
        {
          headers: this.resolveHeaders(),
        }
      );

      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async getProjectEvents(query: any) {
    try {
      const response = await axios.get(`${this.baseUrl}/project-events`, {
        headers: this.resolveHeaders(),
        params: { ...query },
      });

      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async getProjectEventCount(projectId: string, query: any = {}) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/projects/${projectId}/event-count`,
        {
          headers: this.resolveHeaders(),
          params: { ...query },
        }
      );

      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }
}

export default new API();
