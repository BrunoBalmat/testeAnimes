import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import HamburgerMenu from './components/Hamburger';

function App() {

  const [populares, setPopulares] = useState();

  useEffect(() => {
    axios.get(`https://kitsu.io/api/edge/anime?page%5Blimit%5D=5&sort=-average_rating`)
      .then(function (response) {
        setPopulares(response.data.data);
      })
      .catch(function (error) {
        console.error("Erro ao buscar", error);
      });
  }, []);

  console.log(populares, 'populares');

  return (
    <div className="App">
      <HamburgerMenu/>
      <div>
        <header className="App-header">
          <a className='linkhome' href='/'><img src='/logo.png' alt='logo' /></a>
          <input />
        </header>
        <div className='displayPopulares'>
          <h2>Animes Mais Populares</h2>
          <div className='imagensPopulares'>
            {populares?.map(personagem => {
              return (
                <div className='display5animes'>
                  <img src={personagem?.attributes?.posterImage?.small} alt="anime" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
