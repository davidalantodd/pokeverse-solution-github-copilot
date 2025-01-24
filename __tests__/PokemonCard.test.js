/** @jest-environment jsdom */
import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { PokemonCard } from '../src/components/PokemonCard';
import { FavoritesProvider } from '../src/FavoritesProvider';
import { MOCK_ONE_POKEMON_DATA, MOCK_151_POKEMON_DATA } from '../mocks/mockPokemonData';
const initialFetch = window.fetch;


describe('PokemonCard', () => {

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve(MOCK_ONE_POKEMON_DATA),
      })
    );
  });

  afterEach(() => {
    window.fetch = initialFetch;
  });

  it('Should render', async () => {
    await act(async () => {
      render(
        <FavoritesProvider>
            <PokemonCard name={MOCK_ONE_POKEMON_DATA.species.name} url={MOCK_ONE_POKEMON_DATA.species.url} />
        </FavoritesProvider>
      );
    });
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Abilities:')).toBeInTheDocument();
    expect(screen.getByText('Add to favorites')).toBeInTheDocument();
  });

  it('Should toggle when favorites is clicked', async () => {
    await act(async () => {
        render(
          <FavoritesProvider>
              <PokemonCard name={MOCK_ONE_POKEMON_DATA.species.name} url={MOCK_ONE_POKEMON_DATA.species.url} />
          </FavoritesProvider>
        );
    });
    const favoriteToggle = screen.getByRole("button");
        fireEvent.click(favoriteToggle)
  })

  it('Should render the same Pokemon Card multiple times', async () => {
    for (let i = 0; i < 100; i++){
      await act(async () => {
        render(
          <FavoritesProvider>
              <PokemonCard name={MOCK_ONE_POKEMON_DATA.species.name} url={MOCK_ONE_POKEMON_DATA.species.url} />
          </FavoritesProvider>
        );
      });
    }
    
  });

});