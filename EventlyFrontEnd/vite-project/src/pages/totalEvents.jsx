import {useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
function TotalEvents(){
	const [tableData , setTableData] = useState([]);
	const [searchInput , setSearchInput] = useState("");
	const navigate = useNavigate();
	const f0 =(e)=>{
		setSearchInput(e.target.value);
	};
	const f1 =(id)=>{
		navigate(`/detail/${id}`);

	};
	useEffect(()=>{
		fetch("http://localhost/Evently/EventlyBackEnd/eventTable.php" , {
			headers : {"Content-Type" :"application/json"} ,
			credentials : "include"
		}).then((res)=>res.json()).then((data)=>setTableData(data.data || []))
	} , []);
	console.log(tableData);
	////////////////////////////////////////////////////////////////
	const f2 =  async () => {
		const res = await fetch("http://localhost/Evently/EventlyBackEnd/eventTable.php",
		{
			method : "POST",
			headers : {"Content-Type":"application/json"} ,
			body : JSON.stringify({searchInput}),
			credentials : "include"
		})
		const data = await res.json();
		console.log("somthing "); 
		setTableData(data.data)
	};
	////////////////////////////////////////////////////////////////
	const De = async (id) =>{
		const res = await fetch(`http://localhost/Evently/EventlyBackEnd/eventTable.php?id=${id}` ,
		{
			method : "GET" ,
			credentials : "include"
		})
		const data = await res.json();
		console.log(data.message);
		f2();
	};
	/////////////////////////////////////////////////////////////////
	return(
		<> 
			<h1>the events</h1>
			<input type="text" name="serch" value={searchInput} onChange={f0}/>
			<button onClick={f2}>look</button><br/><br/>
			<table>
				<thead>
					<tr>
						<th>event name </th> 
						<th>event time</th>
					</tr>
				</thead> 
				<tbody>
					{tableData.map((TD)=>(
						<tr key = {TD.id}>
							 <td>{TD.name}</td>
							 <td>{TD.time}</td>
							 <td><button onClick={() => f1(TD.id)}>Details</button></td>
							 <td><button onClick={() => De(TD.id) }>Delete</button></td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
export default TotalEvents 