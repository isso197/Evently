import {useContext , createContext , useState , useEffect} from 'react'
const authContext = createContext();
export function AuthProvider({children}){
	const [auth , setAuth] = useState({
		loading : true ,
		isLogged : false,
		user : null
	});
	useEffect(()=>{

		fetch("http://localhost/Evently/EventlyBackEnd/checkSession.php" ,
			{credentials : "include"}
		).then((res)=>res.json())
		.then((data)=>
			setAuth({
			loding : false,
			isLogged : true,
			user : data.user || null }) )

	} , []);

return(
		<authContext.Provider value={{auth,setAuth}}>
			{children}
		</authContext.Provider>
	);
}
export function UseAuth(){
	return  useContext(authContext);
}