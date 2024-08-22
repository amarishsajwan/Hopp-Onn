import swaggerJsdoc, { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Locola",
      version: "1.0.0",
      description: "API documentation for your application",
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            username: { type: "string" },
            contact: { type: "string" },
            gender: { type: "string", enum: ["Male", "Female"] },
            // Add other properties here
          },
        },
        City: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
          },
        },
        Location: {
          type: "object",
          properties: {
            id: { type: "string" },
            cityId: { type: "string" },
            name: { type: "string" },
          },
        },
        Event: {
          type: "object",
          properties: {
            id: { type: "string" },
            userId: { type: "string" },
            time: { type: "number" },
            pickupLocation: { type: "string" },
            dropLocation: { type: "string" },
          },
        },

        // Add additional schema properties if needed
      },
    },
    paths: {
      "/api/v1/admin/createCity": {
        post: {
          summary: "Enter new City in db",
          parameters: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    cityName: {
                      type: "string",
                    },
                    // Add other user properties as needed
                  },
                  required: ["cityName"],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Successful created",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/City",
                  },
                },
              },
            },
            "404": {
              description: "not found",
            },
          },
        },
      },
      "/api/v1/admin/createLocation": {
        post: {
          summary: "create Location",
          parameters: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    cityName: {
                      type: "string",
                    },
                    locationName: {
                      type: "string",
                    },
                    // Add other user properties as needed
                  },
                  required: ["cityName", "locationName"],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Successful",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Location",
                  },
                },
              },
            },
            "404": {
              description: "User not found",
            },
          },
        },
      },
      "/api/v1/admin/allCity": {
        get: {},
      },
      "/api/v1/user/signup": {
        post: {
          summary: "Create  new user",
          parameters: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    username: {
                      type: "string",
                    },
                    contact: {
                      type: "string",
                    },
                    gender: {
                      type: "string",
                      enum: ["Male", "Female"],
                    },
                    // Add other user properties as needed
                  },
                  required: ["username", "contact", "gender"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "User created successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      msg: {
                        type: "string",
                      },
                      token: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: "Validation failed or user already exists",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      msg: { type: "string" },
                      error: { type: "object" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/v1/event/create": {
        post: {
          summary: "Create  Event",
          parameters: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    username: {
                      type: "string",
                    },
                    contact: {
                      type: "string",
                    },
                    gender: {
                      type: "string",
                      enum: ["Male", "Female"],
                    },
                    // Add other user properties as needed
                  },
                  required: ["username", "contact", "gender"],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Successfully created",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            "404": {
              description: "not found",
            },
          },
        },
      },
      "/api/v1/event/myevents": {
        post: {
          summary: "User  Events",
          parameters: [],
          requestBody: {
            required: true,
            content: {},
          },
          responses: {
            "200": {
              description: "Successfully created",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
            "404": {
              description: "not found",
            },
          },
        },
      },

      // Add more paths as needed
    },
  },
  apis: [], // Path to the files containing annotations
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
