import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "./Header";
import PropTypes from "prop-types";

export const SharedLayout = ({ data }) => {
  return (
    <>
      <Header data={data} />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

SharedLayout.propTypes = {
  data: PropTypes.array.isRequired,
};
