"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("news", [
      {
        title: "title1",
        description: "description1",
        text: "text1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);

    await queryInterface.bulkInsert("news", [
      {
        title: "title2",
        description: "description2",
        text: "text2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);

    await queryInterface.bulkInsert("news", [
      {
        title: "title3",
        description: "description3",
        text: "text3",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);

    await queryInterface.bulkInsert("news", [
      {
        title: "title4",
        description: "description4",
        text: "text4",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);

    await queryInterface.bulkInsert("news", [
      {
        title: "title5",
        description: "description5",
        text: "text5",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("news", null, {});
  },
};
