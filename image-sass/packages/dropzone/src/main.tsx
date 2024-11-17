import { render } from "preact";
import { Dropzone } from "../lib/Dropzone.js";

render(
    <Dropzone onDraggingChange={() => {}} onFileChosed={() => {}} />,
    document.getElementById("app")!
);
