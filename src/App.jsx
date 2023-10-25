import { lazy, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SharedLayout } from "./components/SharedLayout";

function App() {
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const current = location.pathname.replace("/Backendless-test-task/", "");

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
        if (!current) {
          navigate("/Backendless-test-task/dummyList");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [current, navigate]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Routes>
      <Route path="/" element={<SharedLayout data={tabs} />}>
        {tabs.map((tab) => {
          const Element = lazy(() => {
            return import(`./tabs/${tab.path}.jsx`);
          });
          return <Route key={tab.id} path={tab.id} element={<Element />} />;
        })}
      </Route>
    </Routes>
  );
}
export default App;
