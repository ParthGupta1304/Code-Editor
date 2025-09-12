import { Link } from "react-router-dom";
const Navbar = () => {
  const navItems = [
    { label: "About", path: "/about" },
    { label: "Login", path: "/login" },
    { label: "SignUp", path: "/signup" },
    
  ];
  return (
    <div className="text-white p-5 text-2xl flex gap-232">
      <div className="logo text-3xl font-semibold ml-10"> CodIT</div>
      <div className="flex gap-10 font-semibold">
        {navItems.map((item) => (
          <div key={item.label} className="nav-item">
            <Link to={item.path} className="p-2 rounded-xl hover:bg-zinc-800 transition-colors">
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Navbar;
