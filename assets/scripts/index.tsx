import React from "react";
import { render } from "react-dom";
import { Main } from "./Main";

const identifier = "root";
const element = document.getElementById(identifier);

render(<Main/>, element);
