import Article, { IArticle } from "../models/article";
import ArticleService, { connectDb } from "./articleService";
import mongoose from "mongoose";

describe("Fetch Articles request", () => {
  let mongoClient: typeof mongoose;

  beforeAll(async () => {
    mongoClient = await connectDb("mongodb://localhost:27017/nodeTraining");
  });

  afterAll(async () => {
    await mongoClient.connection.close();
  });

  // afterEach(async () => {
  //   await mongoClient.connection.db.dropDatabase();
  // });

  test("it should list all articles", async () => {
    const expectedResponse = [
      {
        _id: "62f4020a623154b57a087754",
        title: "hello world",
        body: "In this episode w will insert another article",
        author: "me",
      },
      {
        _id: "62f4020b623154b57a087757",
        title: "hello world",
        body: "In this episode w will insert another article",
        author: "me",
      },
      {
        _id: "62f4020c623154b57a08775a",
        title: "hello world",
        body: "In this episode w will insert another article",
        author: "me",
      },
      {
        _id: "62f4020d623154b57a08775d",
        title: "hello world",
        body: "In this episode w will insert another article",
        author: "me",
      },
    ];

    let response = await ArticleService.fetch();
    expect(response.length).toEqual(expectedResponse.length);

    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "hello world",
        }),
      ])
    );
  });
});
