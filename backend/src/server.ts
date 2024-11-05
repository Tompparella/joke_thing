import express from 'express';
import cors from 'cors';
import { DataSource } from 'typeorm';
import { Category, Joke, Tag } from './entity';
import { AppDataSource1, AppDataSource2, AppDataSource3 } from './data-source';
import './index';

const Sources: { [key: number]: DataSource } = {
  1: AppDataSource1,
  2: AppDataSource2,
  3: AppDataSource3
};

const app = express();
app.use(cors());
app.use(express.json());

app.get('/jokes', async (req, res) => {
  try {
    const query = req.query;
    const region = Number(query["region"]);
    if (region == null) {
      res.status(400).send("No region selected")
    }
    const source = Sources[region];
    const result = await source.getRepository(Joke).find({relations: ['tags', 'category']});
    res.send(result);
  } catch(err) {
    console.error(err);
  }
});

app.get('/categories', async (req, res) => {
  const region = Number(req.query["region"]);
  if (region == null) {
    res.status(400).send("No region selected")
  }
  const source = Sources[region];
  const result = await source.getRepository(Category).find();
  res.send(result);
});

app.get('/tags', async (req, res) => {
  const region = Number(req.query["region"]);
  if (region == null) {
    res.status(400).send("No region selected")
  }
  const source = Sources[region];
  const result = await source.getRepository(Tag).find();
  res.send(result);
});

app.get('/', (req, res) => {
  res.send('hello world');
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Oopsies :(");
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
