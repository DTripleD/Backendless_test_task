import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { HeaderWrapper } from "./Header.styled";

const Header = ({ data }) => {
  return (
    <HeaderWrapper>
      {data.map((el) => {
        return (
          <Link key={el.id} to={el.id}>
            {el.title}
          </Link>
        );
      })}
    </HeaderWrapper>
  );
};

export default Header;

Header.propTypes = {
  data: PropTypes.array.isRequired,
};
