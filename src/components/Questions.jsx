import React from "react";

export default function Questions(props) {
  return (
    <div>
      <h3>{props.question.question}</h3>

      {props.question.options.map((option) => (
        <div key={option}>
          {option.id}
          <span>{option}</span>
        </div>
      ))}
    </div>
  );
}
