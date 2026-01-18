import {useState , useEffect} from 'react'
import {useNavigate} from'react-router-dom'
export default function AddCollab(){
	const [addedCollab , setAddedCollab] = useState({});
	const [collabInfo , setCollabInfo] = useState({
		mail : "" ,
		role : "" ,
		message : ""
	});
	const f0 =(e)=>{
		const name = e.target.name;
		const value = e.target.value;
		setCollabInfo(old => ({...old , [name]:value}) );
	};
	useEffect(()=>(fetch(`http://localhost/Evently/EventlyBackEnd/addCollab.php`)
		{
			credentials : "include"
		}).then(res=>res.json()).then(data=>setAddedCollab(data.sessionCollab || []))
	} , []);

	const f2 = async(e)=>{
		e.preventDefault();
		const res =  await fetch(`http://localhost/EventlyBackEnd/addCollab.php`,{
			method : "POST" ,
			body : JSON.stringify(collabInfo) ,
			credentials : "include" ,
			headers : {"Content-Type":"application/json"}
		}); 
		const data = await res.json();
		navigate("/app/add"); 
	};

	const f3 = async(e)=>{
		e.preventDefault();
		const res =  await fetch(`http://localhost/EventlyBackEnd/addCollab.php`,{
			method : "POST" ,
			body : JSON.stringify(collabInfo) ,
			credentials : "include" ,
			headers : {"Content-Type":"application/json"}
		}); 
		const data = await res.json();
		navigate("/app/addCollab"); 
	};
	const f4 () => {

	}

	return (
		<>
		<h2>Add a collaborator </h2>
		<h4>Added collaborators</h4>
		<ul>
			{addedCollab.map((added)=>(
				<li key={added.id}> {added.nom} : {added.mail} <button onclick={f4}> x </button></li>
			))}
		</ul>
		<form>
			<input type="email" value={collabInfo.mail} placeholder="mail" onChange={f0}/><br/><br/>
			<label>Role :</label><br/>
			<select name="role" value={collabInfo.role} onChange={f0}>
				<option value="admin">Admin</option>
				<option value="editor">Editor</option>
				<option value="viewer">Viewer</option>
			</select><br/><br/>
			<textarea name="message" value={collabInfo.message} placeholder="message:"/><br><br>
			<button onClick={f1}>Cancel</button>
			<button onClick={f2}>Add</button>
			<button onClick={f3}>Add an other</button>
		</form>
		</>
	)
