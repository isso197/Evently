import {Link ,Outlet ,useNavigate ,useLocation} from 'react-router-dom'
function MainLayout(){
	const navigate = useNavigate(); 
	const location = useLocation();
	const f0=()=>{
		navigate(`/app/deconnexionSure`);
	};
	return(
		<>
				<nav>
					<Link to="home">Home|</Link>
					<Link to="totalEvents">Total|</Link>
					<Link to="upcoming">Upcoming |</Link>
					<Link to="closed">Closed |</Link>
					<Link to="add">Add   |</Link>
					<button onClick={f0}>Deconnexion</button>
				</nav>
				<Outlet key={location.pathname}/>
		</>
		);
}
export default MainLayout;