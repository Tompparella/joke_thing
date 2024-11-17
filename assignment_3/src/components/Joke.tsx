import { FC } from "react";
import { JokeResponse } from "../types";

type Callbacks = {
  onEdit: (value: JokeResponse) => void;
  onDelete: (value: JokeResponse) => void;
};

export const Joke: FC<
  JokeResponse & Callbacks
> = (props) => {
  return (
    <div className="item joke">
      <div className="joke-attributes">
        <span className="info-title">{props.category.name}</span>
        <div>
          {props.tags.map((entry) => (
            <span
              key={`${entry.id}${new Date().getTime()}`}
              className="tag-name"
            >
              {entry.name}
            </span>
          ))}
        </div>
      </div>
      <span className="joke-name">{props.name}</span>
      <span className="joke-text">{props.text}</span>
      <div className="joke-info">
        <div className="detail">
          <span className="info-title">ID:</span>
          <span>{props.id}</span>
        </div>
        <div className="detail">
          <span className="info-title">Created:</span>
          <span>{new Date(props.created_at).toLocaleString()}</span>
        </div>
        <div className="detail">
          <span className="info-title">Updated:</span>
          <span>{new Date(props.updated_at).toLocaleString()}</span>
        </div>
        <div className="container">
        <button onClick={() => props.onEdit(props)}>Edit</button>
        <button onClick={() => props.onDelete(props)}>Delete</button>
        </div>
      </div>
    </div>
  );
};
