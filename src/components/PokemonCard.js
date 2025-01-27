import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FavoritesContext } from '../FavoritesProvider';

const cache = {};   // Implementing cache to store individual Pokémon data

/**
 * PokemonCard component that displays a Pokémon's details.
 * Fetches data from the provided URL and uses caching to avoid redundant API calls.
 * Allows adding/removing the Pokémon to/from favorites.
 * 
 * @param {string} url - The URL to fetch the Pokémon data from.
 * @param {string} name - The name of the Pokémon.
 */
function PokemonCard({ url, name }) {
  const [pokemon, setPokemon] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  /**
   * useEffect hook to fetch Pokémon data from the provided URL.
   * Uses caching to avoid redundant API calls.
   */
  useEffect(() => {
    if (cache[url]){ // Use cached result if available
      setPokemon(cache[url]); 
    } else { 
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          cache[url] = data // Store fetched data in cache
          setPokemon(data);
        })
        .catch((error) => {
          console.error(error); // Log any errors during fetch
        });
    }
  }, [url]);

  return (
    <Card style={{ width: '18rem' }} className='mx-auto'>
      <Card.Img
        width='286'
        height='286'
        bg='dark'
        variant='top'
        src={pokemon?.sprites.front_default} // Display Pokémon image
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text as='div'>
          Abilities:
          <ul>
            {pokemon?.abilities.map((ability) => (
              <li key={ability.ability.name}> 
                <span key={ability.ability.name}>{ability.ability.name}</span> {/* Display Pokémon abilities */}
              </li> 
            ))}
          </ul>
        </Card.Text>
        {favorites.some(e => e.name === name) ? (
          <Button variant='danger' onClick={() => removeFavorite(pokemon)}>
            Remove from Favorites
          </Button>
        ) : (
          <Button variant='primary' onClick={() => addFavorite(pokemon)}>
            Add to favorites
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export { PokemonCard };
