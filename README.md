# Backend System for User Management

## Overview

This backend system is designed to manage user authentication, client management, and admin functionality for a web application.

## Table of Contents

- [Setup](#setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Scripts](#scripts)

## Setup

### Prerequisites

- Node.js and npm installed
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>

   ```

2. Install the dependencies:

   ```bash
   npm install


   ```

3. Set up environment variables. Create a .env file in the root directory and add the following variables:

   ```bash
   # Server configuration
   PORT=3000
   NODE_ENV=local

   # Database configuration
   DATABASE_URL=<Your ElephantSQL URL>

   # JWT configuration
   JWT_SECRET_KEY=<Your JWT Secret>
   JWT_EXPIRATION=<Your JWT Expiration Time>
   REFRESH_TOKEN_SECRET=<Your Refresh Token Secret>
   REFRESH_TOKEN_EXPIRATION=<Your Refresh Token Expiration Time>


   # API Key
   API_KEY=<Your API Key>

   # AWS configuration
   AWS_ACCESS_KEY=<Your AWS Access Key>
   AWS_SECRET_KEY=<Your AWS Secret Key>
   AWS_REGION=<Your AWS Region>
   SQS_QUEUE_URL=<Your SQS Queue URL>
   SES_REPLY_TO_EMAIL=<Your SES Reply-To Email>
   SES_SENDER_NAME=<Your SES Sender Name>
   SES_SOURCE_EMAIL=<Your SES Source Email>

   # Server URLs
   LOCAL_SERVER_URL=http://localhost:3000/api/v1
   PRODUCTION_SERVER_URL=https://api.divestbookstore.com/api/v1


   ```

4. Start the Server

   ```bash
    npm run local

   ```

5. API Documentation

   You can view the API documentation by navigating to http://localhost:3000/api-docs.

## Usage

### Authentication

- POST /login - Login a user
- POST /register - Register a new user

### Admin Dashboard

- GET /admin/clients - List all registered clients
- PUT /admin/clients/:id - Update client details
- DELETE /admin/clients/:id - Remove a client

## API Documentation

### Swagger Doc

- You can view the API documentation by navigating to http://localhost:3000/api-docs after starting the server.

## Scripts

### Install Dependencies

    ```bash
    npm install

    ```

### Test

    ```bash
    npm run test

    ```

### Start

    ```bash
    npm run local

    ```
