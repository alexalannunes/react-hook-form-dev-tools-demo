import { DevTool } from "@hookform/devtools";

import { Router } from "./routes";
import { useControl } from "./context/control-provider";

function App() {
  const control = useControl();
  return (
    <>
      <Router />
      {control && (
        <DevTool
          styles={{
            panel: {
              width: 300,
            },
          }}
          control={control}
        />
      )}
    </>
  );
}

export default App;
