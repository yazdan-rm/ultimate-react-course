import {Link} from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";

function Header() {
  return (
      <div>
        <Link to={'/'}>Fast Pizza Co.</Link>
        <SearchOrder/>
        <p>Yazdan</p>
      </div>
  );
}

export default Header;