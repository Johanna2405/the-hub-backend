import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "The Hub API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Authentication routes",
      },
      {
        name: "Users",
        description: "User management routes",
      },
      {
        name: "Communities",
        description: "Community-related routes",
      },
      {
        name: "Lists",
        description: "List related routes",
      },
      {
        name: "Messages",
        description: "Messages routes",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
