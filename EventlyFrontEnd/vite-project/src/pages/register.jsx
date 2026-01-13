import {Link , useNavigate} from 'react-router-dom'
import {useState} from 'react'
function Register(){
		const navigate = useNavigate();

		const [registerData,setRegisterData] = useState({
		first_name : "" ,
		last_name : "" ,
		email : "" ,
		age : 18,
		pass : "",
		verifPass : ""
	});
	const f1 = (e)=>{
		const name = e.target.name;
		const value = e.target.value;
		setRegisterData(old =>({...old , [name] : value}));
	};
	const f2 = async (e) => {
		e.preventDefault();
		const res = await fetch('http://localhost/Evently/EventlyBackEnd/register.php' ,
		{
			method : "POST",
			headers : {"Content-Type":"application/json"},
			body : JSON.stringify(registerData),
			credentials :"include" 
		});
		const data = await res.json();
		alert(data.message);
		if(data.success === true){
		navigate(`/login`)
	}
	};

	return(
		<>
			<h1>register page</h1>
			<form onSubmit={f2}>
				<input type="text" name ="first_name" value={registerData.first_mame} onChange={f1} placeholder="name:"/><br/><br/>
				<input type="text" name ="last_name" value={registerData.last_name} onChange={f1} placeholder="name:"/><br/><br/>
				<input type="email" name ="email" value={registerData.email} onChange={f1} placeholder="email:"/><br/><br/>
				<input type="number" name ="age" value={registerData.age} onChange={f1} placeholder="age:"/><br/><br/>
				<input type="password" name ="pass" value={registerData.pass} onChange={f1} placeholder="password:"/><br/><br/>
				<input type="password" name ="verifPass" value={registerData.verifPass} onChange={f1} placeholder="verify password:"/><br/><br/>
				<button type="submit">Register</button><br/><br/>
				<Link to="/login">already have an accout : login</Link>
			</form>
		</>
		);
}
export default Register