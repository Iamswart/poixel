import { RegisterInterface, LoginInterface, UpdateData } from "../interfaces/auth";
import logger from "../logger";
import AuthService from "../services/auth";

export default class AuthController {
  private authService = new AuthService();

  async registerUser(input: RegisterInterface) {
    try {
      return await this.authService.register(input);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async loginUser(input: LoginInterface) {
    try {
      return await this.authService.login(input);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async listClients() {
    try {
      return await this.authService.listClients();
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateClient(id: string, updateData: UpdateData) {
    try {
      return await this.authService.updateClient(id, updateData);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async deleteClient(id: string) {
    try {
      return await this.authService.deleteClient(id);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
