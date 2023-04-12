import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const token = Cookies.get("token");
  if (token === undefined) {
    return (window.location.href = "/login");
  }
  return { ...props };
};

export default ProtectedRoute;
