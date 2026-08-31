import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCredentials } from "../store/authSlice";
import { logoutUser } from "../services/authService";
import { showToast } from "../features/toast/toastSlice";
import { MdAccountBalance } from "react-icons/md";

function Header() {
const dispatch = useDispatch();
const navigate = useNavigate();
const {
        user
    } = useSelector(
        (state) => state.auth
    );
const handleLogout = async () => {

    try {

        await logoutUser();

        dispatch(clearCredentials());

        dispatch(
            showToast({
                message: "Logged out successfully.",
                variant: "success",
            })
        );

        navigate("/login", {
            replace: true,
        });

    } catch (error) {

        console.error("Logout error:", error);

        dispatch(
            showToast({
                message:
                    "Unable to logout. Please try again.",
                variant: "danger",
            })
        );

    }
};
  return (
    <header className="p-3 text-bg-dark" style={{height:'10%'}}>
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
          </a>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" style={{fontFamily:'monospace'}}>
            <li>
              <h4 className="px-2"><MdAccountBalance /></h4>  
            </li>
            <li>
              <h3 className="px-2">{user.fullname}</h3>
            </li>
          </ul>

          <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
           <h3 className="px-2" style={{color:'beige', fontFamily:'monospace'}}>Mstr-Ledger</h3>
          </form>
          <div className="text-end">
            <button
              type="button"
              className="btn btn-outline-light me-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;