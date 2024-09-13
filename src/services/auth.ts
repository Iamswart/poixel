import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { RegisterInterface, LoginInterface, UpdateData } from "../interfaces/auth";
import db from "../database/models/";
import { badRequestError } from "../error";
import logger from "../logger";
import config from "../config";
import emailTemplates from "../emailTemplates/emailTemplates";
import sqs from "../utils/sqs-consumer";


const { User } = db;

export default class AuthService {
  async register(input: RegisterInterface) {
    const { email, name, password, businessType } = input;

    const emailExist = await User.findOne({ where: { email } });
    if (emailExist) {
      throw badRequestError(
        "Email address already exists, please login to continue"
      );
    }

    const user = await User.create({
      email,
      name,
      password,
      businessType,
      isAdmin: false,
    });

    
    const welcomeMsgData = {
      notifyBy: ["email"],
      email: user.email,
      subject: "Welcome",
      data: { name: `${user.name}` },
      template: emailTemplates.welcome,
    };

    const welcomeSqsOrderData = {
      MessageAttributes: {
        type: { DataType: "String", StringValue: "email" },
      },
      MessageBody: JSON.stringify(welcomeMsgData),
      QueueUrl: process.env.SQS_QUEUE_URL as string,
    };

    sqs
      .sendMessage(welcomeSqsOrderData)
      .promise()
      .then((data) =>
        logger.info(`Welcome Email sent | SUCCESS: ${data.MessageId}`)
      )
      .catch((error) => logger.error(`Error sending Welcome email: ${error}`));

    const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      config.auth.secretToken,
      { expiresIn: config.auth.tokenExpiration }
    );
    const refreshToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      config.auth.secretRefreshToken,
      { expiresIn: config.auth.tokenRefreshExpiration }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        businessType: user.businessType,
      },
      accessToken,
      refreshToken,
    };
  }

  async login(input: LoginInterface) {
    const { email, password } = input;

    const user = await User.findOne({ where: { email } });
    if (!user) throw badRequestError("Email Or Password Incorrect");

    if (user.status === "inactive") {
      throw badRequestError(
        "Your account has been disabled. Please contact support."
      );
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) throw badRequestError("Email Or Password Incorrect");

    const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      config.auth.secretToken,
      { expiresIn: config.auth.tokenExpiration }
    );
    const refreshToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      config.auth.secretRefreshToken,
      { expiresIn: config.auth.tokenRefreshExpiration }
    );

    user.lastLoginAt = new Date();
    await user.save();

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        businessType: user.businessType,
      },
      accessToken,
      refreshToken,
    };
  }

  async listClients() {
    const clients = await User.findAll({ where: { isAdmin: false } });
    return clients;
  }

  async updateClient(id: string, updateData: UpdateData ) {
    const client = await User.findByPk(id);
    if (!client || client.isAdmin) {
      throw badRequestError("Client not found or cannot update admin.");
    }

    await client.update(updateData);
    return client;
  }

  async deleteClient(id: string) {
    const client = await User.findByPk(id);
    if (!client || client.isAdmin) {
      throw badRequestError("Client not found or cannot delete admin.");
    }

    await client.destroy();
    return { message: "Client deleted successfully." };
  }
}
