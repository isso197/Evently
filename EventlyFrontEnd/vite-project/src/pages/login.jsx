import {UseAuth} from '../route/authProvider.jsx'
import {Link ,useNavigate} from 'react-router-dom'
import {useState} from 'react'
function Login(){
	const {setAuth} = UseAuth();
	const navigate = useNavigate();
	const [loginData , setLoginData]=useState({email:"" , pass:""})
	const f1 = (e) =>{
		const name = e.target.name;
		const value = e.target.value;
		setLoginData(old => ({...old , [name]:value}));
	};

	const f2 = async (e)=>{
		e.preventDefault();
		const res = await  fetch("http://localhost/Evently/EventlyBackEnd/login.php" ,
		{
			method : "POST",
			headers : {"Content-Type":"application/json"},
			body : JSON.stringify(loginData),
			credentials : "include"
		});
		//afficher la reponse 
		const data = await res.json();

		 if(data.success){
		 	setAuth({
		 		loding : false,
		 		isLogged :true ,
		 		user : data.user
		 	}
		 	)
		 };
		 navigate("/app/home" , {replace:true});
	};

return(
	<>
		<h1>hello login page</h1>
		<form onSubmit={f2}>
			<input type="email" name="email" value={loginData.email} onChange={f1} placholder="enter mail"/><br/><br/>
			<input type="password" name="pass" value={loginData.pass} onChange={f1} placeholder="enter pass"/><br/><br/>
			<button type="submit">submit</button><br/><br/>
			<Link to="/register">register</Link>	
		</form>
	</>
	);
}
export default Login