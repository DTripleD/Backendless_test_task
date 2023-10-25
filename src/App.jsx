import { lazy, useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

const DummyChart = lazy(() => import("./pages/dummyChart"));
const DummyList = lazy(() => import("./pages/dummyList"));
const DummyTable = lazy(() => import("./pages/dummyTable"));

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
        <Route path="/" element={<DummyChart />} />
        <Route path="/list" element={<DummyList />} />
        <Route path="/table" element={<DummyTable />} />
      </Routes>
    </>
  );
}
export default App;
