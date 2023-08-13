import axios from "axios";

class API {
  private baseUrl = "http//localhost:7000/v1";

  async createProject(body: any) {
    try {
      const response = await axios.post(`${this.baseUrl}/projects`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error: any) {
      console.log(error.response);
    }
  }
}

export default new API();
