import { useContext } from 'react';
import Feed from './Feed';
import DataContext from './context/DataContext';


const Home = () => {
    const{searchResults,isLoading}=useContext(DataContext)
    if(isLoading) return <p> Loading....</p>
    return (
        <main className="Home">
            {searchResults.length?(
                <Feed posts={searchResults}/>
            ):(<p style={{marginTop:"2rem"}}>No posts to display</p>)}
        </main>
    )
}

export default Home