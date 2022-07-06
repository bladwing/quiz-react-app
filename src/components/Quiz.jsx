import React from "react";
import { Rings } from "react-loader-spinner";
import { Progress } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Quiz() {
  return (
    <div>
      <h1>This is Quiz...</h1>
      <Rings />

      <Progress multi>
        <Progress bar color="success" value="30" />
      </Progress>
    </div>
  );
}
