import {useNavigate} from 'react-router-dom'
function DeconnexionSure(){
	const navigate = useNavigate();

	const f1= async()=>{
		const res = await fetch("http://localhost/Evently/EventlyBackEnd/deconnexion.php" ,
		{	
			credentials:"include" ,
		});
		const data = await res.json();
		//alert(data.message);
		navigate(`/login` , {replace:true});
	};
	const f2=()=>{
		navigate(`/app/home`);
	}
	return(
		<>
			<div>
				<p>Are you sure you want to deconnect?</p><br/>
				<button onClick={f1}>yes</button>
				<button onClick={f2}>no</button>
			</div>
		</>
	);
}
export default DeconnexionSure