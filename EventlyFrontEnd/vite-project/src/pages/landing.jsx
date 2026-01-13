import {useNavigate} from 'react-router-dom'
function Landing(){
	const navigate = useNavigate();
	const f1 = () =>{
		navigate(`/login`);
	};
	const f0 = () =>{
		navigate(`/register`);
	};
	return(
		<>
		<header>
			<ul>
				<li><img src="#" alt=""/></li>
				<li><h3>Eventra</h3></li>
				<li>how it works</li>
				<li><button onClick={f1}>Login</button></li>
				<li><button onClick={f0}>Get started</button></li>
			</ul>
		</header>
		<main>
			{/*the hero section*/}
			<section>
				<div>
					<h1>Plan your events, all in one place</h1>
					<p>Create, organize, and follow your events from planning to event day</p>
					<img src="#" alt=""/>
					<button onClick={f0}>Get Started</button>
				</div>
			</section>
			{/*How it works section*/}
			<section>
				<div>
					<h2>How to use Eventra</h2>
					<div>
						<img src="#" alt=""/>
						<p>Create an event</p>'
					</div>
					<div>
						<img src="#" alt=""/>
						<p>Add details & notes</p>
					</div>
					<div>
						<img src="#" alt=""/>
						<p>Follow your event timeline</p>
					</div>
				</div>
			</section>
			{/*who is this for part*/}
			<section>
				<div>
					<h2>Who it’s for</h2>
					<div>
						<img src="#" alt=""/>
						<p>Events Planners</p>'
					</div>
					<div>
						<img src="#" alt=""/>
						<p>Associations</p>
					</div>
					<div>
						<img src="#" alt=""/>
						<p>Freelencers</p>
					</div>
				</div>
				<div>
					<img src="#" alt=""/>
					<p>Students</p>
				</div>
			</section>
		</main>
	</>
	);
}
export default Landing