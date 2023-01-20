import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const StyledLink = styled(NavLink)`
    color: black;
    text-decoration: none;
    font-weight: 400;
    font-size: 30px;
    padding: 10px;
    line-height: 2;
    text-align: center;
    transition: color 250ms linear;

    &.active {
      color: rgb(211, 0, 105);
    }
    :hover {
      color: rgb(211, 0, 105);
    }
  `;

  const StyledHeader = styled.header`
    padding: 20px;
    width: 100vw;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  `;

  return (
    <StyledHeader>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="movies">Movies</StyledLink>
    </StyledHeader>
  );
};
export default Header;
