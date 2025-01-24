import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce'; // import debounce library
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import { FavoritesProvider } from './FavoritesProvider';
import { Favorites } from './components/Favorites';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState(''); // create new state to protect against lag for users

  // Debounce the search input to limit the rate of state updates
  const debouncedSetSearch = useCallback(
    debounce((value) => setSearch(value), 200),
    []
  );

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setFilteredPokemon(
      pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, pokemonList]);

  const handleChange = (event) => { // update both states here
    setInput(event.target.value);
    debouncedSetSearch(event.target.value);
  };

  return (
    <div data-testid="app">
      <FavoritesProvider>
        <Navigation />
        
        <Container>
          <Row className='mb-4'>
            <Col sm='8' md='6' className='mx-auto'>
              <InputGroup>
                <InputGroup.Text id='search'>Search</InputGroup.Text>
                <FormControl
                  value={input}
                  aria-label='search'
                  aria-describedby='search'
                  onChange={handleChange} // change this onChange to call the new function
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-4'>
            <h1>Favorites</h1>
            <Col>
              <Favorites/>
            </Col>
          </Row>
          <Row className='g-4'>
          <h1>Available</h1>
            {filteredPokemon.map((pokemon) => (
              <Col key={pokemon.name}>
                <PokemonCard url={pokemon.url} name={pokemon.name} />
              </Col>
            ))}
          </Row>
        </Container>
      </FavoritesProvider>
    </div>
  );
}

export { App };
