// Frontend code 
// Filename - App.js

import { useState, useEffect } from 'react'
import './App.css';
function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetch('https://waitlist-backend-pied.vercel.app/users/count')
        .then(res => res.json())
        .then(data => {
            setCount(data.count);
        })
        .catch(error => {
            console.error('Error fetching user count:', error);
        });
        
    }
    , []);
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'https://waitlist-backend-pied.vercel.app/register', {
            method: "post",
            body: JSON.stringify({ name, email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved successfully");
            setEmail("");
            setName("");
        }
    }
    return (
        <>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
<link href="https://fonts.googleapis.com/css2?family=McLaren&display=swap" rel="stylesheet"></link>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
            <h1 style = {{fontWeight: "bold", margin:"auto", textAlign:"center", color: "#2d5c4b", marginTop: "15%"}}>Shout </h1> 
            <h2 style = {{fontFamily: "McLaren", margin:"auto", textAlign:"center"}}>waitlist</h2>
            <form action="" style={{ display: "flex", flexDirection: "column", width: "40%", margin: "auto", marginTop: "1%" }}>
                <input type="text" placeholder="name" style={{ width:"80%", margin: "auto", marginTop: "2%", padding: "5px 10px", borderRadius: "1px", fontFamily: 'Montserrat'}}
                value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="email" style={{width:"80%", margin: "auto", marginTop: "2%", padding: "5px 10px", borderRadius: "1px", fontFamily: 'Montserrat'}}
                value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <button type="submit" class="my-button" 
                style = {{ marginLeft: "1%", background: "#e4d59b", fontSize: "16px",color: "#bac4a1" , border: "none", padding: "5px 10px", borderRadius: "1px", fontFamily: "McLaren", cursor: "pointer", width: "20%", margin: "auto", marginTop: "4%", overflow: "hidden"}}
                onClick={handleOnSubmit}>submit</button>
            </form>
            <div style={{ margin: "auto", textAlign: "center", marginTop: "2%" }}>
            <p class="join">join {count} others in your travels!</p>
            </div>
        </>
    );
}

export default App;