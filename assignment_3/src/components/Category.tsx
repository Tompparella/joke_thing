import { FC } from "react";
import { CategoryResponse } from "../types";

export const Category: FC<CategoryResponse> = (props) => {
  return (
    <div className="item category">
      <span className="info-title">{props.name}</span>
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
