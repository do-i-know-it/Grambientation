import React from "react";
import { render } from "react-dom";

const identifier = "root";
const element = document.getElementById(identifier);
const content = <main>Hello world in React</main>;

render(content, element);
