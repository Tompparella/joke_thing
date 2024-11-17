import { FC, useCallback, useRef } from "react";
import {
  CategoryResponse,
  CreateJoke as CreateJokeType,
  TagResponse,
} from "../types";
import { FormType, Submitter } from "../constants";

type Props = {
  categories: CategoryResponse[];
  tags: TagResponse[];
  onSubmit: (value: CreateJokeType, db: Submitter) => Promise<boolean>;
};

const CategoryRadio: FC<{ category: CategoryResponse }> = ({ category }) => {
  return (
    <div>
      <span>{category.name}</span>
      <input
        type="radio"
        name={FormType.Category}
        value={category.id}
        required
      />
    </div>
  );
};

const TagCheckbox: FC<{ tag: TagResponse }> = ({ tag }) => {
  return (
    <div>
      <span>{tag.name}</span>
      <input type="checkbox" name={FormType.Tags} value={tag.id} />
    </div>
  );
};

const handleForm = (form: any[]): CreateJokeType | null => {
  const indexes = Array.from({ length: 8 }, (x, i) => i);
  const joke: CreateJokeType = { name: "", text: "", categoryId: 0, regionId: 1, tags: [] };
  indexes.forEach((index) => {
    const entry = form[index];
    switch (entry.name) {
      case FormType.Name:
        joke.name = entry.value;
        break;
      case FormType.Text:
        joke.text = entry.value;
        break;
      case FormType.Category:
        entry.checked && (joke.categoryId = Number(entry.value));
        break;
      case FormType.Tags:
        entry.checked && joke.tags.push(Number(entry.value));
        break;
    }
  });
  if (joke.tags.length < 1) {
    alert("Please select at least one tag");
    return null;
  }
  return joke;
};

export const CreateJoke: FC<Props> = ({ categories, tags, onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const send = useCallback(
    async (e: any) => {
      e.preventDefault();
      console.log(e.nativeEvent.submitter.name);
      const joke = handleForm(e.target);
      if (joke == null) {
        alert(`Invalid joke: '${JSON.stringify(joke, null, 2)}'`);
        return;
      }
      const result = await onSubmit(joke, e.nativeEvent.submitter.name);
      if (result && formRef.current !== null) formRef.current.reset();
    },
    [onSubmit]
  );

  return (
    <form ref={formRef} className="item create" onSubmit={send}>
      <span className="info-title">Name</span>
      <input type="text" name={FormType.Name} required />
      <span className="joke-text">Text</span>
      <textarea name={FormType.Text} cols={40} rows={5} required />
      <span className="joke-text">Category</span>
      <div className="container">
        {categories.map((entry) => (
          <CategoryRadio key={entry.id} category={entry} />
        ))}
      </div>
      <span className="joke-text">Tags</span>
      <div className="container">
        {tags.map((entry) => (
          <TagCheckbox key={entry.id} tag={entry} />
        ))}
      </div>
      <div className="container">
        <button name={Submitter.Postgre} type="submit">
          Send to PostgreDB
        </button>
        <button name={Submitter.Mongo} type="submit">
          Send to MongoDB
        </button>
      </div>
    </form>
  );
};
