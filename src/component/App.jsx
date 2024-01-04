import React ,{useEffect,useState}from "react";
import SearchIcon from "../search.svg"
import MovieCard  from "./MovieCard";
// API KEY = http://www.omdbapi.com/?i=tt3896198&apikey=e5bed19

const apiUrl ="http://www.omdbapi.com/?i=tt3896198&apikey=e5bed19"


function App(){
    // State sa pag display ng mga data from api
    const [movies, setMovies] = useState([]);  
     // State sa get ng user input na ipass sa search movies function

    const [searchTerm, setSearchTerm] = useState("");

    //  Api fetch and response
    const searchMovies = async (title) =>{
        const responce = await fetch(`${apiUrl}&s=${title}`);
        const data = await responce.json();
        setMovies(data.Search);
    }
    // Use effect for kung ano ang irerender kapag nag reload yung webpage
    useEffect(()=>{
           searchMovies("Superman") ;
    },[]);

    // function na naghahandle ng event from user 
    function handleOnchange(event){
        setSearchTerm(event.target.value)
        console.log(event.target.value);
    }
    
    // function for click after getting the user input 
    function handleOnClick(){
        searchMovies(searchTerm);
    }
    

    return <div className="app">
        <h1> MovieLand</h1>
        <div className="search">
            <input placeholder="Search for Movies" value={movies.Title} onChange={handleOnchange} ></input>
            <img src={SearchIcon} alt="search icon" onClick={handleOnClick} />
        </div>
        {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard  key={movie.imdbID} year={movie.Year} img={movie.Poster} type={movie.Type} title={movie.Title} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )};
    </div>
}

export default App;