import { lazy, useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { SharedLayout } from "./components/SharedLayout";

function App() {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/DTripleD/Backendless_test_task/main/public/tabs.json"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const sortedData = data.sort((a, b) => a.order - b.order);
        setTabs(sortedData);
        // if (!currentTabId) {
        //   navigate("/backendless_CMS/dummyList");
        // }
        // setDataLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          {tabs.map((tab) => {
            const Table = lazy(() => {
              return import(`./${tab.path}`);
            });
            return <Route key={tab.id} path={tab.id} element={<Table />} />;
          })}
        </Route>
      </Routes>
    </>
  );
}
export default App;
