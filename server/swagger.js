const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger configuration
const options = {
  definition: {
    openapi: "3.0.4",
    info: {
      title: "BLOG-SITE API",
      version: "1.0.0",
      description: "API for registering and logging in users and manaing blogs",
      contact: {
        name: "Ambagwa Eugene",
        url: "https://github.com/ambagwa",
        email: "ambagwaeugene09@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Internal staging server for testing",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs loaded");
};

module.exports = swaggerDocs;
