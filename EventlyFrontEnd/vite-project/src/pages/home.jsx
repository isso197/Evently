import '../style/home.css'
import {useState , useEffect} from 'react'
import {useNavigate , Link} from 'react-router-dom'
function Home(){
	const navigate = useNavigate();
	const [search , setSearch] = useState("");
	const [coming ,setComing] = useState([]);
	const f0 = (e) =>{
		setSearch(e.target.value);
	};
	const f1 = async (e)=>{
		e.preventDefault();
		const res = await fetch("http://localhost/Evently/EventlyBackEnd/home.php" ,
		{
			"method" :"POST" ,
			"headers" : {"Content-Type":"application/json"} ,
			"body" : JSON.stringify(search) , 
			"credentials" : "include"
		});
	};

	useEffect(()=>{fetch("http://localhost/Evently/EventlyBackEnd/home.php"
		,{"credentials" : "include" }).
	    then(res=>(res.json()) )
	    .then(data=>(setComing(data.data || {} )) )
	},[]);
	const f2 = () => {
		navigate('/app/add');
	};
	const fGoProfil = ()=>{
		navigate('/app/profil');
	};
	
	return(
		<>
		<div id="hall">
			<div id="firstside">
				<aside>
					<ul className="aside">
						<li><img src="#" alt="profile" onClick={fGoProfil}/></li>
						<li><a href='#'>(i)</a></li>
						<li><a href="#">(n)</a></li>
					</ul>
				</aside>
			</div>
			<div className="main">
				<div id="secondside">
					<div className="searchDiv">
						<img src="#" alt="evently"/>
						<form>
								<input type="text" name="search"  onChange={f0} placeholder="search"/><button onClick={f1}>c</button>
						</form>
						<button onClick={f2}>Create</button>
					</div>
					<nav>
						<ul className="searchDiv">
							<li><Link to="/app/upcoming">upcoming</Link></li>
							<li><Link to="/app/totalEvents">All events</Link></li>
							<li><Link to="/app/closed">Closed</Link></li>
						</ul>
					</nav>
				</div>
				<div id="eventDisplayZone">
					{
						coming.map((c)=>(
							<div className="comingEvent" key={c.id}>
								<h4>{c.title}</h4>
								<p>{c.description}</p>
								<p>{c.date} , {c.time}</p>
							</div>
						))	
					}
				</div>
			</div>
		</div>
		</>
	);
}
export default Home