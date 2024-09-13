"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash("AdminPassword123", 10);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: Sequelize.UUIDV4(),
          name: "Admin User",
          email: "admin@example.com",
          password: passwordHash,
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      "users",
      { email: "admin@example.com" },
      {}
    );
  },
};
