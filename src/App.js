// Frontend code 
// Filename - App.js

import { useState, useEffect } from 'react'
import './App.css';
import { Fade } from "react-awesome-reveal";
import doubleDown from './assets/icons8-double-down-50.png';
import bg from './assets/jungleblack.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';

function AnimatedWords() {
    const words = ["explore", "adventure", "discover", "hike", "kayak", "camp", "climb", "ski", "surf", "bike", "run", "swim"];
    
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <span
            key={words[index]}
            className="jump-in"
            style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: "2.2rem",
                transition: "opacity 0.5s",
                letterSpacing: "2px",
                textShadow: "2px 2px 8px #000",
                fontFamily: "McLaren",
                textDecoration: "underline",
                textUnderlineOffset: "8px",
                textDecorationColor: "#e4d59b",
                textDecorationThickness: "2px",
                textDecorationStyle: "wavy",
                marginBottom: "2.5%"
            }}
        >
            {words[index]}
        </span>
    );
}
function Splashwords () {
    const phrases = ["made at your local coffeeshop", "I like mangoes", "find your dojo.", "Comes with fruits!"]
    const [index1, setIndex1] = useState(0);
    useEffect(()=> {
        const interval = setInterval(() => {
            setIndex1((prev) => (prev + 1) % phrases.length);
        }, 10000)
        return () => clearInterval(interval);

    }, []);
    return(
        <span
            key={phrases[index1]}
            style={{
                display: "inline-block",
                position: "relative",
                left: "50%",
                transform: "translate(-50%, -60%) rotate(0deg)",
                whiteSpace: "nowrap"
            }}
        >
            {phrases[index1]}
        </span>
    )
    

}
function App() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [count, setCount] = useState(0);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
            if(!validator.isEmail(email)){
                toast.error("Please enter a valid email!")
                return;
            }
            toast.success("Registration successful!", {
                position: "top-center",
                autoClose: 3000,
                style: {
                    background: "#2d5c4b",
                    color: "#e4d59b",
                    fontFamily: "Manrope, Inter, Arial, sans-serif",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    borderRadius: "8px",
                    boxShadow: "0 20px 12px #0003"
                }
            });
            setEmail("");
            setName("");
        }
    }
    return (
        <>
        <div style={{
            position: "relative",
            minHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
        }}>
            
            {/* Grayscale background image */}
            <div style={{   
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: "url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                filter: "grayscale(1)",
                zIndex: 1
            }} />
            {/* Dark green overlay */}
            <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(10, 44, 14, 0.7)",
                zIndex: 2
            }} />
            {/* Content */}
            <div style={{
                position: "relative",
                zIndex: 3,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "Manrope, Inter, Arial, sans-serif"
            }}>
                <h1 style={{
                    fontWeight: "bold",
                    fontFamily: "Manrope, Inter, Arial, sans-serif",
                    color: "#fff",
                    fontSize: "3.5rem",
                    marginBottom: "0.5rem",
                    marginTop: "3rem",
                    textShadow: "2px 2px 12px #000"
                }}>HikeMeet</h1>
                <h2 style={{
                    position: "relative",
                    fontFamily: "Manrope, Inter, Arial, sans-serif",
                    color: "#e4d59b",
                    fontWeight: 600,
                    fontSize: "2rem",
                    marginBottom: "1.5rem",
                    letterSpacing: "2px",
                    textShadow: "1px 1px 6px #000",
                }}>Find your Trail Tribe.{/*splash text?*/}
                <div
                  className="bolster"
                  style={{
                    position: "absolute",
                    zIndex: 9999,
                    right: 0,
                    bottom: 0,
                    width: 0,
                    height: 0,
                    fontSize: "0.5em",
                    color: "white",
                    textAlign: "left",
                    fontFamily: "McLaren"
                  }}
                >
                  <Splashwords />
                </div></h2>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1.5rem"
                }}>
                    
                </div>
                {/* Hiking/Mountain SVG for theme */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 32" width="120" height="60" fill="none" style={{marginTop: "1rem", marginBottom: "1rem"}}>
                  <polygon points="2,32 16,8 32,32" fill="#bac4a1" />
                  <polygon points="16,32 32,4 48,32" fill="#e4d59b" />
                  <polygon points="32,32 48,12 62,32" fill="#2d5c4b" />
                  <circle cx="52" cy="8" r="4" fill="#fff" opacity="0.7"/>
                </svg>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: "-140px",
                    transform: "translateX(-50%)",
                    width: "40px",
                    height: "40px",
                    backgroundImage: `url(${doubleDown})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    zIndex: 10
                  }}
                ></div>
            </div>
        </div>
        <div style={{
            position: "relative",
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            backgroundColor: "rgb(13, 20, 14)",
            /*backgroundImage: `url(${bg})`, */
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
            <Fade duration={2000} style={{ marginTop: "5%" }}>
            <h1 className= "jump-in" style={{ color: "white", fontSize: "2.2rem", fontFamily: "Manrope" }}> meet people. </h1>
            </Fade>
  
            <Fade duration={2000} style={{marginTop:"5%"}}>
            <h1 className= "jump-in" style={{ color: "white", fontSize: "2.2rem", fontFamily: "Manrope"}}> find trails. </h1>
            </Fade>
            

            <Fade duration={2000} style={{ marginBottom: "5%", marginTop: "5%" }}>
            <h1
              className="jump-in"
              style={{
                color: "white",
                fontSize: "2.2rem",
                fontFamily: "Manrope",
                textAlign: "center",
                width: "100%",
                margin: 0,
              }}
            >
              form unforgettable memories.
            </h1>
            </Fade>
        </div>
        <div style={{
            position: "relative",
            minHeight: "40vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            backgroundColor: "rgb(13, 20, 14)",
            /*backgroundImage: `url(${bg})`, */
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
            <Fade duration={2000}>
             <h1 className= "jump-in" style={{ color: "white", fontSize: "3.2rem", fontFamily: "Manrope", marginTop: "0%" }}> what's our deal? </h1>
             </Fade>
            <div
              style={{
                display: "flex",
                flexDirection: windowWidth < 700 ? "column" : "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0rem",
                width: "100%",
                margin: "1rem 0",
                marginBottom: "1%",
                fontFamily: "McLaren"
              }}
            >
              <div style={{ flex: "2", background: "#e4d59b", padding: "1rem", borderRadius: "8px", margin: "1%", height: "25vh" , fontSize: "1.6vw", width: windowWidth < 1000 ? "80%" : "auto", textAlign:"center"}}>
                1. Set up your account & profile through us with a simple survey
              </div>
              <div style={{ flex: "2", background: "#bac4a1", padding: "1rem", borderRadius: "8px", margin: "1%", height: "25vh" , fontSize: "1.6vw", width: windowWidth < 1000 ? "80%" : "auto", textAlign:"center"}}>
                2. Let us handle the matching to find you your people
              </div>
              <div style={{ flex: "2", background: "#2d5c4b", color: "#fff", padding: "1rem", borderRadius: "8px", margin: "1%", height: "25vh" , fontSize: "1.6vw", width: windowWidth < 1000 ? "80%" : "auto", textAlign:"center"}}>
                3. Get sent an invite to a groupchat / contacts and chat
              </div>
              <div style={{ flex: "2", background: "#073b0e", color: "#fff", padding: "1rem", borderRadius: "8px", margin: "1%", height: "25vh" , fontSize: "1.6vw", width: windowWidth < 1000 ? "80%" : "auto", textAlign:"center"}}>
                4. Have fun, and enjoy your adventure! It's as easy as that
              </div>
            </div>
            <div style={{ height: "20vh", display: "flex", alignItems: "center", justifyContent: "center" , marginBottom: "5%"}}>
            <span style={{ color: "#bac4a1", fontSize: "1.5rem", fontFamily: "Manrope", marginRight: "1rem" }}>Ready to</span>
                    <AnimatedWords />
                    <span style={{ color: "#bac4a1", fontSize: "1.5rem", fontFamily: "McLaren" , marginLeft: "0.5rem"}}>?</span>
            </div>
        
        </div>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=McLaren&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
            <div style={{
                position: "relative",
                minHeight: "50vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                backgroundColor: "rgb(14, 31, 17)"}}>
            <h1 style = {{fontWeight: "bold", textAlign:"center", color: "#2d5c4b", marginTop: "5%", fontFamily: "Manrope, Inter, Arial, sans-serif", textShadow: "2px 2px 12px #000"}}>Join the Waitlist</h1> 
            <h2 style = {{fontFamily: "Manrope, Inter, Arial, sans-serif",  textAlign:"center", color: "rgb(241, 241, 241)", marginTop: "0%"}}>Sign up below</h2>
            <form action="" style={{ display: "flex", flexDirection: "column", width: "40%",  marginTop: "1%" }}>
                <input type="text" placeholder="name" style={{ width:"80%", margin: "auto", marginTop: "2%", padding: "5px 10px", borderRadius: "1px", fontFamily: 'Manrope, Inter, Arial, sans-serif'}}
                value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="email" style={{width:"80%", margin: "auto", marginTop: "2%", padding: "5px 10px", borderRadius: "1px", fontFamily: 'Manrope, Inter, Arial, sans-serif'}}
                value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <button
                  type="submit"
                  className="my-button"
                  style={{
                    background: "#e4d59b",
                    color: "#073b0e",
                    border: "none",
                    padding: window.innerWidth < 600 ? "14px 0" : "14px 0",
                    fontFamily: "Manrope, Inter, Arial, sans-serif",
                    fontSize: window.innerWidth < 600 ? "16px" : "18px",
                    fontWeight: 600,
                    cursor: "pointer",
                    width: window.innerWidth < 1000 ? "80%" : "80%",
                    margin: "24px auto 0 auto",
                    display: "block",
                    maxWidth: "400px",
                    minHeight: "24px",
                    boxShadow: "0 2px 8px #0002",
                    boxSizing: "border-box"
                  }}
                  onClick={handleOnSubmit}
                >
                  submit
                </button>
            </form>
            <div style={{ margin: "auto", textAlign: "center", marginTop: "2%" }}>
            <p className="join" style={{ color: "#fff", fontFamily: "McLaren, Inter, Arial, sans-serif", fontWeight: 500, marginBottom: "40%" }}>join {count} others in your travels!</p>
            </div>
            </div>
        
        {/* Cheeky footnote with socials */}
        <footer style={{
            width: "100%",
            background: "rgba(10,44,14,0.95)",
            color: "#e4d59b",
            textAlign: "center",
            padding: "1.2rem 0 1.5rem 0",
            fontFamily: "Manrope, Inter, Arial, sans-serif",
            fontSize: "1rem",
            letterSpacing: "0.5px",
            marginTop: "0rem",
            boxShadow: "0 -2px 16px 0 rgba(44,62,52,0.10)",
            position: "relative"
        }}>
            
            <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                Made with <span style={{color: "#e25555"}}>♥</span> in the wild.<br/>
            </span>
            <span style={{ fontSize: "0.95rem", color: "#bac4a1" }}>
                Follow us for more adventures:
            </span>
            
            <div style={{ marginTop: "0.5rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#e4d59b", textDecoration: "none", fontWeight: 700 }}>
                    🐦 Twitter
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#e4d59b", textDecoration: "none", fontWeight: 700 }}>
                    📸 Instagram
                </a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#e4d59b", textDecoration: "none", fontWeight: 700 }}>
                    💻 GitHub
                </a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" style={{ color: "#e4d59b", textDecoration: "none", fontWeight: 700 }}>
                    Terms & Services
                </a>
            </div>
            <div style={{ marginTop: "0.7rem", fontSize: "0.9rem", color: "#bac4a1" }}>
                P.S. we'll send you stickers if you email our email directly asking
            </div>
        </footer>
        <ToastContainer />
        </>
    );
}

export default App;