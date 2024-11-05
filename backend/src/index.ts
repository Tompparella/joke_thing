import * as sources from "./data-source";
import { Category, Joke, Region, Tag } from "./entity";

const appSources = Object.values(sources);

const getEntities = () => {
    const tag1 = new Tag();
    const tag2 = new Tag();
    const tag3 = new Tag();

    const region1 = new Region();
    const region2 = new Region();
    const region3 = new Region();

    const joke1_1 = new Joke();
    const joke1_2 = new Joke();
    const joke1_3 = new Joke();

    const joke2_1 = new Joke();
    const joke2_2 = new Joke();
    const joke2_3 = new Joke();

    const joke3_1 = new Joke();
    const joke3_2 = new Joke();
    const joke3_3 = new Joke();

    const category1 = new Category();
    const category2 = new Category();
    const category3 = new Category();

    region1.name = "Region 1";
    region2.name = "Region 2"
    region3.name = "Region 3"

    tag1.name = "Edgy";
    tag1.description = "Simple-mindedly and transparently trying to appear tough or 'cool', for the sake of being provocative and/or offensive";

    tag2.name = "Satire";
    tag2.description = "A literary work in which human foolishness or vice is attacked through irony, derision, or wit";

    tag3.name = "Silly";
    tag3.description = "Exhibiting or indicative of a lack of common sense or sound judgment";

    category1.name = "Political";
    category1.description = "Make fun on your favorite politicians";

    category2.name = "Carefree";
    category2.description = "Lighthearted fun";

    category3.name = "Brainrot";
    category3.description = "Skibidi ohio rizz";

    joke1_1.name = "Single";
    joke1_1.text = "I just asked my Siri, “Why am I still single?”. It activated the front camera";
    joke1_1.region = region1;
    joke1_1.tags = [tag1, tag3];
    joke1_1.category = category2;

    joke1_2.name = "Useless";
    joke1_2.text = "Useless people are good for something. They make me laugh when they fall down the stairs and hurt themselves";
    joke1_2.region = region1;
    joke1_2.tags = [tag3];
    joke1_2.category = category2;

    joke1_3.name = "Nemo";
    joke1_3.text = "Nemo and my dad must be great friends. They both can’t be found";
    joke1_3.region = region1;
    joke1_3.tags = [tag1];
    joke1_3.category = category3;

    joke2_1.name = "Brother";
    joke2_1.text = "I was raised as an only child, which is probably why my brother hates me so much";
    joke2_1.region = region2;
    joke2_1.tags = [tag1, tag2];
    joke2_1.category = category2;

    joke2_2.name = "Bomb";
    joke2_2.text = "‘You the bomb.’ ‘No, you the bomb.’ Similar phrases with completely different meanings if you’re in the middle east instead of the U.S.A.";
    joke2_2.region = region2;
    joke2_2.tags = [tag1, tag3];
    joke2_2.category = category1;

    joke2_3.name = "Single";
    joke2_3.text = "I just asked my Siri, “Why am I still single?”. It activated the front camera";
    joke2_3.region = region2;
    joke2_3.tags = [tag1, tag3];
    joke2_3.category = category2;

    joke3_1.name = "Single";
    joke3_1.text = "I just asked my Siri, “Why am I still single?”. It activated the front camera";
    joke3_1.region = region1;
    joke3_1.tags = [tag1, tag3];
    joke3_1.category = category1;

    joke3_2.name = "Single";
    joke3_2.text = "I just asked my Siri, “Why am I still single?”. It activated the front camera";
    joke3_2.region = region1;
    joke3_2.tags = [tag1, tag3];
    joke3_2.category = category2;

    joke3_3.name = "Single";
    joke3_3.text = "I just asked my Siri, “Why am I still single?”. It activated the front camera";
    joke3_3.region = region1;
    joke3_3.tags = [tag1, tag3];
    joke3_3.category = category3;

    return {
        jokes: [ [joke1_1, joke1_2, joke1_3], [joke2_1, joke2_2, joke2_3], [joke3_1, joke3_2, joke3_3] ],
        regions: [region1, region2, region3],
        categories: [ category1, category2, category3 ],
        tags: [tag1, tag2, tag3],
    }
}

const entities = getEntities();

appSources.forEach((entry, key) => {
    entry.initialize().then(async () => {

        console.log(`Datasources initialized`)

        /* // Uncomment to initialize db with values
        entities.categories.forEach(async (entity) => await entry.manager.save(entity));
        entities.tags.forEach(async (entity) => await entry.manager.save(entity));
        await entry.manager.save(entities.regions[key]);
        entities.jokes[key].forEach(async entity => await entry.manager.save(entity)); */
    
    }).catch(error => console.log(error))
})

