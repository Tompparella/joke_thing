import express, { Response } from "express";
import cors from "cors";
import { DataSource, In } from "typeorm";
import { Category, Joke, Tag } from "./entity";
import { MongoJoke } from "./entity/mongodb";
import {
  AppDataSource1,
  AppDataSource2,
  AppDataSource3,
  AppDataSource4 as mongo,
} from "./data-source";
import "./index";

const Sources: { [key: number]: DataSource } = {
  1: AppDataSource1,
  2: AppDataSource2,
  3: AppDataSource3,
};

const app = express();
app.use(cors());
app.use(express.json());

const sendError = (res: Response, err: unknown) =>
  res.status(400).send({
    message: `Oopsies :(\n${err})`,
  });

app.get("/jokes", async (req, res) => {
  try {
    const query = req.query;
    const region = Number(query["region"]);
    if (region == null) {
      res.status(400).send("No region selected");
    }
    const source = Sources[region];
    const result = await source
      .getRepository(Joke)
      .find({ relations: ["tags", "category"] });
    res.send(result);
  } catch (err) {
    console.error(err);
    sendError(res, err);
  }
});

app.post("/jokes", async (req, res) => {
  try {
    const query = req.query;
    const region = Number(query["region"]);
    if (region == null) {
      res.status(400).send("No region selected");
    }
    const source = Sources[region];
    const data = req.body;
    const tags = await source.getRepository(Tag).find({ where: { id: In(data.tags) } });
    const entity = Joke.create({...data, tags });
    const result = await source.getRepository(Joke).save(entity);
    res.send(result);
  } catch (err) {
    console.error(err);
    sendError(res, err);
  }
})

app.get("/mongo-jokes", async (req, res) => {
  try {
    const mongoResult = await mongo.getRepository(MongoJoke).find();
    const result = await Promise.all(mongoResult.map(async (entry) => {
      const { categoryId, tags } = entry;
      const source = Sources[entry.regionId];
      const tempCategory = await source.getRepository(Category).findOne({ where: { id: categoryId } });
      const tempTags = await source.getRepository(Tag).find({ where: { id: In(tags) } })
      const temp = Joke.create({ ...entry, category: tempCategory, tags: tempTags });
      return temp;
    }))
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
    sendError(res, err);
  }
});

app.post("/mongo-jokes", async (req, res) => {
  try {
    const data = req.body;
    const entity = MongoJoke.create(data);
    const result = await mongo.getRepository(MongoJoke).save(entity);
    res.send(result);
  } catch (err) {
    console.error(err);
    sendError(res, err);
  }
})

app.get("/categories", async (req, res) => {
  const region = Number(req.query["region"]);
  if (region == null) {
    res.status(400).send("No region selected");
  }
  const source = Sources[region];
  const result = await source.getRepository(Category).find();
  res.send(result);
});

app.get("/tags", async (req, res) => {
  const region = Number(req.query["region"]);
  if (region == null) {
    res.status(400).send("No region selected");
  }
  const source = Sources[region];
  const result = await source.getRepository(Tag).find();
  res.send(result);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Oopsies :(");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
