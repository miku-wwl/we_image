import { Dropzone } from "../lib/Dropzone";

export function App() {
    return (
        <>
            <Dropzone
                style={{ width: 200, height: 200, backgroundColor: "red" }}
                setChildrenContainer={() => {}}
                onDraggingChange={() => {}}
            ></Dropzone>
        </>
    );
}