import {useParams, useNavigate} from 'react-router-dom';
import{useState , useEffect } from 'react';
function Detail(){
	const [detailData , setDetailData] = useState({});
	const {id} = useParams();
	useEffect(()=>{
		fetch( `http://localhost/Evently/EventlyBackEnd/detail.php?id=${id}`,
		{method :"GET" , credentials : "include"})
		.then(res=>res.json())
		.then(data=>{
			console.log(data);
			setDetailData(data.data[0])})
	},[]);
	return(
		<>
		 {detailData.name && ( 
		 	<>
			<h1>{detailData.name}</h1>
			<p>{detailData.description}</p><br/>
			<span>{detailData.time}</span><br/>
			<span>{detailData.location}</span><br/>
			<span>{detailData.category}</span><br/>
			</>
		)
		}
		 {!detailData.name && (
		 	<p>Loding...</p>
		 )}
	</>);
}
export default Detail