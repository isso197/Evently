import {useNavigate} from 'react-router-dom'
function Home(){
	const Navigate = useNavigate();
	const f1 =()=>{
		Navigate("add");
	};
	return(
		<>
			<h1>Are you ready to plaaaaaaaaan you life give it a choot</h1>
			<button onClick={f1}>Add An event</button>
		</>
	);
}
export default Home