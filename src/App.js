import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce'; // Import debounce library to limit the rate of function calls
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import { FavoritesProvider } from './FavoritesProvider';
import { Favorites } from './components/Favorites';

/**
 * Main application component that fetches and displays a list of Pokémon.
 * Includes search functionality with debouncing to filter the Pokémon list.
 */
function App() {
  const [pokemonList, setPokemonList] = useState([]); // State to store the list of all Pokémon
  const [filteredPokemon, setFilteredPokemon] = useState([]); // State to store the filtered Pokémon based on search
  const [search, setSearch] = useState(''); // State to store the debounced search input
  const [input, setInput] = useState(''); // State to store the immediate search input

  /**
   * Debounces the search input to limit the rate of state updates.
   * @param {string} value - The search input value.
   */
  const debouncedSetSearch = useCallback(
    debounce((value) => setSearch(value), 150), // Debounce function to update search state after 200ms
    []
  );

  /**
   * Fetches the list of Pokémon from the API on component mount.
   */
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results); // Set the fetched Pokémon list to state
      })
      .catch((error) => {
        console.error(error); // Log any errors during fetch
      });
  }, []);

  /**
   * Filters the Pokémon list based on the debounced search input.
   */
  useEffect(() => {
    setFilteredPokemon(
      pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, pokemonList]);

  /**
   * Handles input change and updates both immediate and debounced search states.
   * @param {object} event - The input change event.
   */
  const handleChange = (event) => {
    setInput(event.target.value); // Update immediate input state
    debouncedSetSearch(event.target.value); // Update debounced search state
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
                  onChange={handleChange} // Handle input change to update search states
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
                <PokemonCard url={pokemon.url} name={pokemon.name} /> {/* Render filtered Pokémon cards */}
              </Col>
            ))}
          </Row>
        </Container>
      </FavoritesProvider>
    </div>
  );
}

export { App };
