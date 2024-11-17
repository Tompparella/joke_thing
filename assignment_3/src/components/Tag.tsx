import { FC } from "react";
import { TagResponse } from "../types";

export const Tag: FC<TagResponse> = (props) => {
  return (
    <div className="item tag">
      <span className="joke-name">{props.name}</span>
      <span className="detail">{props.description}</span>
      <div className="joke-info">
        <div className="detail">
          <span className="info-title">ID:</span>
          <span>{props.id}</span>
        </div>
      </div>
    </div>
  );
};
