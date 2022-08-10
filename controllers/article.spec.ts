import { Request, Response } from "express";
import { ArticleController } from "./index";
import { IArticle } from "../models/article";

describe("Fetch Articles request", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  let responseObject: IArticle[];

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      statusCode: 200,
      send: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    };
  });

  test("200 - fetch Articles", () => {
    const expectedStatusCode = 200;
    const expectedResponse = {
      articles: [
        {
          _id: "62f156cce22ac9fa9f869e98",
          title: "hello world",
          body: "In this episode w will insert an article",
          author: "me",
        },
        {
          _id: "62f2a498ef38d8e177cb648d",
          title: "hello world",
          body: "In this episode w will insert another article",
          author: "me",
        },
      ],
    };

    ArticleController.fetch(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.statusCode).toBe(expectedStatusCode);
    expect(responseObject).toEqual(expectedResponse);
  });
});
