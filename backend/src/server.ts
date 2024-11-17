import express, { Response } from "express";
import cors from "cors";
import { DataSource, In, MongoRepository } from "typeorm";
import { Category, Joke, Region, Tag } from "./entity";
import { MongoJoke } from "./entity/mongodb";
import {
  AppDataSource1,
  AppDataSource2,
  AppDataSource3,
  AppDataSource4 as mongo,
} from "./data-source";
import "./index";
import { ObjectId } from "mongodb";

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
      return;
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
    const data = req.body;
    if (data.regionId == null) {
      res.status(400).send("No region selected");
    }
    if (Object.keys(data).length != 5)
      res.status(400).send(`Invalid object: ${data}`);
    const source = Sources[data.regionId];
    const tags = await source
      .getRepository(Tag)
      .find({ where: { id: In(data.tags) } });
    const category = await source
      .getRepository(Category)
      .findOne({ where: { id: data.categoryId } });
    const region = await source
      .getRepository(Region)
      .findOne({ where: { id: data.regionId } });
    const entity = Joke.create({ ...data, tags, category, region });
    const result = await source.getRepository(Joke).save(entity);
    res.send(result);
  } catch (err) {
    console.error(err);
    sendError(res, err);
  }
});

app.patch("/jokes", async (req, res) => {
  try {
    const entity = req.body;
    const region = entity?.region;
    if (entity == null || region == null) {
      res.status(400).send("No region or entity defined");
      return;
    }
    const source = Sources[region];
    const partial = {
      name: entity.name,
      text: entity.text,
    };
    const result = await source
      .getRepository(Joke)
      .update({ id: entity.id }, partial);
    res.send(result);
  } catch (err) {
    console.error(err);
    sendError(res, err);
  }
});

app.delete("/jokes", async (req, res) => {
  try {
    const id = req.body.id;
    const region = req.body.region;
    if (region == null || id == null) {
      res.status(400).send("No region or id selected");
      return;
    }
    const source = Sources[region];
    const result = await source.getRepository(Joke).delete(id);
    res.send(result);
  } catch (err) {
    console.error(err);
    sendError(res, err);
  }
});

app.get("/mongo-jokes", async (req, res) => {
  try {
    const mongoResult = await mongo.getMongoRepository(MongoJoke).find();
    const result = await Promise.all(
      mongoResult.map(async (entry) => {
        const { categoryId, tags } = entry;
        const source = Sources[entry.regionId];
        const tempCategory = await source
          .getRepository(Category)
          .findOne({ where: { id: categoryId } });
        const tempTags = await source
          .getRepository(Tag)
          .find({ where: { id: In(tags) } });
        const temp = Joke.create({
          ...entry,
          category: tempCategory,
          tags: tempTags,
        });
        return temp;
      })
    );
    res.send(result);
  } catch (err) {
    console.error(err);
    sendError(res, err);
  }
});

app.post("/mongo-jokes", async (req, res) => {
  try {
    const data = req.body;
    if (Object.keys(data).length != 5) {
      res.status(400).send(`Invalid object: ${data}`);
      return;
    }
    const entity = MongoJoke.create(data);
    if (Object.keys(entity).length != 5) return;
    const result = await mongo.getMongoRepository(MongoJoke).save(entity);
    res.send(result);
  } catch (err) {
    console.error(err);
    sendError(res, err);
  }
});

app.delete("/mongo-jokes", async (req, res) => {
  try {
    const id = req.body.id;
    if (id == null) {
      res.status(400).send("No id selected");
      return;
    }
    const result = await mongo.getMongoRepository(MongoJoke).delete({ id });
    res.send(result);
  } catch (err) {
    console.error(err);
    sendError(res, err);
  }
});

app.patch("/mongo-jokes", async (req, res) => {
  try {
    const entity = req.body;
    const id = entity.id;
    if (id == null || entity == null) {
      res.status(400).send("No entity or id defined");
      return;
    }
    const result = await mongo
      .getMongoRepository(MongoJoke)
      .updateOne({ _id: new ObjectId(id) }, { $set: { name: entity.name, text: entity.text, updated_at: new Date() } });
    console.log(result);
    res.send(result);
  } catch (err) {
    console.error(err);
    sendError(res, err);
  }
});

app.get("/categories", async (req, res) => {
  const region = Number(req.query["region"]);
  if (region == null) {
    res.status(400).send("No region selected");
    return;
  }
  const source = Sources[region];
  const result = await source.getRepository(Category).find();
  res.send(result);
});

app.get("/tags", async (req, res) => {
  const region = Number(req.query["region"]);
  if (region == null) {
    res.status(400).send("No region selected");
    return;
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
