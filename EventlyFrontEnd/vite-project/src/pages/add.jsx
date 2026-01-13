import {useState} from 'react'
function Add (){
	const [eventInfo , setEventInfo] = useState({
		name : "",
		description : "",
		time :"2025-06-04T04:34",
		location :"",
		categorie:""
	});
	const f1 = (e) =>{
		const name = e.target.name;
		const value = e.target.value;
		setEventInfo(old =>({...old , [name] : value}));
	};
	const f2 = async (e) =>{
		e.preventDefault();
		const res = await fetch("http://localhost/Evently/EventlyBackEnd/add.php" ,
		{
			method : "POST",
			body : JSON.stringify(eventInfo),
			headers : {"Content-Type" : "application/json"},
			credentials : "include"
		});
		const data = await res.json();
		console.log(data);
		alert(data.message);
	};
	return(
		<>
			<h1>add an event </h1>
			<form onSubmit={f2}>
				<input type="text" name="name" value={eventInfo.name} onChange={f1} placeholder="Event name"/><br/><br/>
				<textarea name="description" value={eventInfo.description} onChange={f1} placeholder="Description" /><br/><br/>
				<input type="datetime-local" name="time" value={eventInfo.time} onChange={f1} placeholder="date and time"/><br/><br/>
				<input type="text" name="location" value={eventInfo.location} onChange={f1} placeholder="location"/><br/><br/>
				<label>Categorie</label><br/>
				<select name="categorie" value={eventInfo.categorie} onChange={f1}>
					<option value="">Choose category</option>
					<option value="School" >School</option>
					<option value="Birthday" >Birthday</option>
					<option value="Gym" >Gym</option>
				</select><br/><br/>
				<button type="submit">Add</button>
			</form>
		</>
	);
}
export default Add