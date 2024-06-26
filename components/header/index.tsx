import { useState, useEffect, useRef, useContext } from "react";
import useOnClickOutside from "use-onclickoutside";
import Logo from "../../assets/icons/logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { RootState } from "store";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { ThemeContext } from "components/context/theme-context";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "store/reducers/userReducer";

type HeaderType = {
  isErrorPage?: Boolean;
};

const Header = ({ isErrorPage }: HeaderType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const arrayPaths = ["/"];
  const [onTop, setOnTop] = useState(
    !arrayPaths.includes(router.pathname) || isErrorPage ? false : true
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLoggedIn = useSelector((state: RootState) => state.isloggedin.isLoggedin);
  if (isLoggedIn) {
    console.log("IS header Logged in", isLoggedIn);
  }
  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    dispatch(logout());
    router.push("/login");
  };
  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <Link href="/">
          <h1 className="site-logo">
            <Logo />
            Lari
          </h1>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <Link href="/products">Products</Link>
          <a href="#">Inspiration</a>
          <a href="#">Rooms</a>
          <button className="site-nav__btn">
            <p>Account</p>
          </button>
        </nav>

        <div className="site-header__actions">
          <button
            ref={searchRef}
            className={`search-form-wrapper ${
              searchOpen ? "search-form--active" : ""
            }`}
          >
            <form className={`search-form`}>
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              ></i>
              <input
                type="text"
                name="search"
                placeholder="Enter the product you are looking for"
              />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            ></i>
          </button>
          <DarkModeSwitch
            className="dark-toggle"
            checked={theme === "light" ? false : true}
            onChange={toggleTheme}
            moonColor={!onTop ? "white" : "black"}
            sunColor={!onTop ? "black" : "white"}
            size={24}
          />
          <Link href="/cart" legacyBehavior>
            <button className="btn-cart">
              <i className="icon-cart"></i>
              {cartItems.length > 0 && (
                <span className="btn-cart__count">{cartItems.length}</span>
              )}
            </button>
          </Link>
          {isLoggedIn ? (
            <button className="site-nav__btn" onClick={handleLogout}>
              <i className="icon-log-in"></i>
              <p>Logout</p>
            </button>
          ) : (
            <Link href="/login">
              <button className="site-nav__btn">
                <b>Login</b>
              </button>
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span></span>
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
