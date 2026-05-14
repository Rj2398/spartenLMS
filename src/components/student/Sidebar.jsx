import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ showSidebar }) => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: "/images/menu/1.svg",
      menuKey: "dashboard",
    },
    {
      name: "Completion & Score",
      path: "/student/progress-and-score",
      icon: "/images/menu/3.svg",
      menuKey: "progress",
    },
    {
      name: "Payments",
      path: "/student/payments",
      icon: "/images/menu/payment.png",
    },
    {
      name: "Profile",
      path: "/student/profile",
      icon: "/images/menu/4.svg",
    },
  ];

  const commonPaths = [
    "/student/subject-detail",
    "/student/lesson-detail",
    "/student/baseline-assignment",
    "/student/summative-assessment",
    "/student/assesment-review",
  ];

  const isCommonPath = commonPaths.some((route) =>
    location.pathname.startsWith(route)
  );

  const isActive = (path) => {
    const fromPage = sessionStorage.getItem("activeMenu");

    // Dashboard Active
    if (path === "/student/dashboard") {
      if (location.pathname === "/student/dashboard") return true;

      return fromPage === "dashboard" && isCommonPath;
    }

    // Progress Active
    if (path === "/student/progress-and-score") {
      if (location.pathname === "/student/progress-and-score") return true;

      return fromPage === "progress" && isCommonPath;
    }

    return location.pathname === path;
  };

  const handleMenuClick = (menuKey) => {
    if (menuKey) {
      sessionStorage.setItem("activeMenu", menuKey);
    }
  };

  return (
    <section id="sidebar" className={`${showSidebar ? "" : " hide"}`}>
      <Link
        to="/student/dashboard"
        className="brand"
        onClick={() => handleMenuClick("dashboard")}
      >
        <div className="login-logo">
          <img src="/images/login/logo.svg" alt="" />
        </div>

        <img src="/images/coll-logo.svg" alt="" className="collapsed" />
      </Link>

      <ul className="side-menu">
        <h2>Navigation</h2>

        {menuItems.map((item, index) => (
          <li key={index} className={isActive(item.path) ? "active" : ""}>
            <Link to={item.path} onClick={() => handleMenuClick(item.menuKey)}>
              <img src={item.icon} alt={`${item.name} sidebar`} />
              <span className="text">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Sidebar;

// // import { Link, useLocation } from 'react-router-dom';

// // const Sidebar = ({showSidebar}) => {
// // 	const location = useLocation();

// // 	const menuItems = [
// // 		{ name: 'Dashboard', path: '/student/dashboard', icon: '/images/menu/1.svg' },
// // 		// { name: 'Subjects', path: '/student/subjects', icon: '/images/menu/2.svg' },
// // 		{ name: 'Completion & Score', path: '/student/progress-and-score', icon: '/images/menu/3.svg' },
// // 		{ name: 'Payments', path: '/student/payments', icon: '/images/menu/payment.png' },
// // 		{ name: 'Profile', path: '/student/profile', icon: '/images/menu/4.svg' }
// // 	];

// // 	// const isActive = (path) => location.pathname === path;
// // 	// const isActive = (path) => location.pathname === path || (path === '/student/dashboard' && location.pathname.startsWith('/student/subject-detail'));

// // 	// const isActive = (path) =>
// // 	// location.pathname === path ||
// // 	// (path === '/student/dashboard' &&
// // 	// 	(
// // 	// 		location.pathname.startsWith('/student/subject-detail') ||
// // 	// 		location.pathname.startsWith('/student/lesson-detail') ||
// // 	// 		location.pathname.startsWith('/student/baseline-assignment') ||
// // 	// 		location.pathname.startsWith('/student/summative-assessment')||
// // 	// 		location.pathname.startsWith('/student/assessment-review')
// // 	// 	)
// // 	// );

// // const isActive = (path) => {
// // 	const fromPage = sessionStorage.getItem("activeMenu");

// // 	if (path === "/student/dashboard") {
// // 		return (
// // 			fromPage === "dashboard" &&
// // 			(
// // 				location.pathname === "/student/dashboard" ||
// // 				location.pathname.startsWith("/student/subject-detail") ||
// // 				location.pathname.startsWith("/student/lesson-detail") ||
// // 				location.pathname.startsWith("/student/baseline-assignment") ||
// // 				location.pathname.startsWith("/student/summative-assessment") ||
// // 				location.pathname.startsWith("/student/assesment-review")
// // 			)
// // 		);
// // 	}

// // 	if (path === "/student/progress-and-score") {
// // 		return (
// // 			fromPage === "progress" &&
// // 			(
// // 				location.pathname === "/student/progress-and-score" ||
// // 				location.pathname.startsWith("/student/subject-detail") ||
// // 				location.pathname.startsWith("/student/lesson-detail") ||
// // 				location.pathname.startsWith("/student/baseline-assignment") ||
// // 				location.pathname.startsWith("/student/summative-assessment") ||
// // 				location.pathname.startsWith("/student/assesment-review")
// // 			)
// // 		);
// // 	}

// // 	return location.pathname === path;
// // };
// // 	return (
// // 		<section id="sidebar" className={`${showSidebar ? '' : ' hide'}`}>
// // 			<Link to="/student/dashboard" className="brand">
// // 				{/* <img src="/images/logo.svg" alt="Brand Logo" />  */}
// // 				  {/* <img src="/images/login/logo.svg" alt="" /> */}
// // 				<div className="login-logo">
// // 						<img src="/images/login/logo.svg" alt="" />
// // 					</div>
// // 				<img src="/images/coll-logo.svg" alt="" className="collapsed"></img>
// // 			</Link>

// // 			<ul className="side-menu">
// // 				<h2>Navigation</h2>

// // 				{menuItems.map((item, index) => (
// // 					<li key={index} className={isActive(item.path) ? 'active' : ''}>
// // 						<Link to={item.path}>
// // 							<img src={item.icon} alt={`${item.name} sidebar`} />
// // 							<span className="text">{item.name}</span>
// // 						</Link>
// // 					</li>
// // 				))}
// // 			</ul>
// // 		</section>
// // 	);
// // };

// // export default Sidebar;
