import { Request, Response } from "express";
import { ArticleController } from "./index";
import { IArticle } from "../models/article";
import { connectDb } from "../services/articleService";
import mongoose from "mongoose";

describe("Fetch Articles request", () => {
  let mongoClient: typeof mongoose;

  beforeAll(async () => {
    mongoClient = await connectDb("mongodb://localhost:27017/nodeTraining");
  });

  afterAll(async () => {
    await mongoClient.connection.close();
  });

  test("200 - fetch Articles", async () => {
    const request = {};
    const response: Partial<Response> = {
      statusCode: 200,
      send: jest.fn().mockImplementation((result) => {
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              title: "hello world",
            }),
          ])
        );
      }),
    };

    const expectedStatusCode = 200;
    await ArticleController.fetch(request as Request, response as Response);
    expect(response.statusCode).toBe(expectedStatusCode);
  });
});
