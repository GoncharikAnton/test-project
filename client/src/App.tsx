import {BrowserRouter} from "react-router";
import './App.css';
import { useRoutes } from "./routes/routes";
import { TestContext } from "./context/testContext";

function App() {
  const routes = useRoutes()
  
  return (
    <TestContext.Provider value={{
      testNum: 1,
      testStr: 'test',
      testObj: {test: 'this is a test object'}
    }}>
      <BrowserRouter>
        {routes}
          {/* <div className="App">
          </div> */}
      </BrowserRouter>
    </TestContext.Provider>
    
  );
}

export default App;
