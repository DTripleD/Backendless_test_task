import { lazy, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { SharedLayout } from "./components/SharedLayout";

function App() {
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/DTripleD/Backendless_test_task/main/public/tabs.json"
    )
      .then((res) => {
        setLoading(true);
        return res.json();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => a.order - b.order);
        setTabs(sortedData);

        // setDataLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Routes>
      <Route path="/" element={<SharedLayout data={tabs} />}>
        {tabs.map((tab) => {
          const path = tab.order === 0 ? tab.id : tab.id;
          const Element = lazy(() => {
            return import(`./tabs/${tab.path}.jsx`);
          });
          return <Route key={tab.id} path={path} element={<Element />} />;
        })}
      </Route>
    </Routes>
  );
}
export default App;
