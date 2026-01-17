import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
function Add (){
	const navigate = useNavigate();
	const [eventInfo , setEventInfo] = useState({
		name : "",
		description : "",
		date : "2025-06-04" , 
		time : "05:01",
		location :"",
		categorie:"",
		vibe : "",
		guests:"",
		status:"" ,
		ideas :"" ,
		reminders:"",
		warnings:""
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
		alert(data.message);
		navigate('/app/totalEvents');
	};
	return(
		<>
			<h1>Create New Event </h1>                        |
			<h3>Fill the details of your event</h3>
			<form onSubmit={f2}>
				<input type="text" name="name" value={eventInfo.name} onChange={f1} placeholder="Event name"/><br/><br/>
				<textarea name="description" value={eventInfo.description} onChange={f1} placeholder="Description" /><br/><br/>
				<input type ="date" name="date" value={event.date} onChange={f1} placeholder="date"/><br/><br/>
				<input type="time" name="time" value={event.time} onChange={f1} placeholder="time"/><br/><br/>
				<input type="text" name="location" value={eventInfo.location} onChange={f1} placeholder="location"/><br/><br/>

				<label>Type</label><br/>
				<select name="categorie" value={eventInfo.categorie} onChange={f1}>
					<option value="">Choose category</option>
					<option value="birthday" >Birthday Celebration</option>
					<option value="wedding" >Wedding</option>
					<option value="conference" >Conference</option>
					<option value="workshop" >Workshop</option>
					<option value="business meeting" >Business Meeting</option>
					<option value="corporate event" >Corporate Event</option>
					<option value="training session" >Training Session</option>
					<option value="Birthday" >Birthday</option>
					<option value="festival" >Festival</option>
					<option value="Charity Event" >Charity Event</option>
					<option value="team building" >Team Building</option>
					<option value="other">Other </option>
				</select><br/><br/>

				<label>Vibe</label><br/>
				<select name="vibe" value={eventInfo.vibe} onChange={f1}>
					<option value="formal">Formal</option>
					<option value="festive" >Festive</option>
					<option value="corporate" >Corporate</option>
					<option value="creative">Creative</option>
					<option value="intimate">Intimate</option>
					<option value="outdoors" >Outdoors</option>
				</select><br/><br/>
				
				<input name="guests" type="number" value={eventInfo.guests} onChange={f1} placeholder="expected guests"/><br/><br/>

				<label>Status</label><br/>
				<select name="status" value={eventInfo.status} onChange={f1}>
					<option></option>
					<option value="in Preparation">In Preparation</option>
					<option value="ready">Ready</option>
					<option value="needs Attention">needs Attention</option>
					<option value="completed">Completed</option>
				</select><br/><br/>
				<label>Ideas:</label><br/>
				<textarea name="ideas" value={eventInfo.ideas} onChange={f1} /><br/><br/>
				<label>Reminders</label><br/>
				<textarea name="reminders" value={eventInfo.reminders} onChange={f1}/><br/><br/>
				<label>Warnings</label><br/>
				<textarea name="warnings" value={eventInfo.warnings} onChange={f1}/><br/><br/>
			<button type="submit">Add</button>
			</form>
		</>
	);
}
export default Add