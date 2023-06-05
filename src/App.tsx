import { useState } from "react";
import { lazy, Suspense } from "react";
import { List, Scene } from "./components";
import data from "./data";
import "./App.scss";

function App() {
  const firstExampleId = data[0].id;
  const [activeExampleId, setActiveExampleId] =
    useState<number>(firstExampleId);

  const activeExampleName = data.find(
    (example) => example.id === activeExampleId
  )?.name;

  const ActiveExample = activeExampleName
    ? lazy(
        () =>
          import(
            `./examples/${activeExampleName.toLowerCase()}/${activeExampleName}.tsx`
          )
      )
    : null;

  return (
    <>
      <div className="column left">
        <h1>WebGL Shader Playground</h1>
        <List
          onItemClick={setActiveExampleId}
          data={data}
          activeId={activeExampleId}
        />
      </div>
      <div className="column right">
        <Scene>
          <Suspense>{ActiveExample && <ActiveExample />}</Suspense>
        </Scene>
      </div>
    </>
  );
}

export default App;
