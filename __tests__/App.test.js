/** @jest-environment jsdom */
import React from 'react';
import { act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import { App } from '../src/App';
import { MOCK_POKEMON_DATA, MOCK_151_POKEMON_DATA } from '../mocks/mockPokemonData';
const initialFetch = window.fetch;

jest.mock("../src/components/PokemonCard", () => ({
  PokemonCard: jest.fn((props) => (
    <div data-testid="PokemonCard">{props.name}</div>
  ))
}));

describe('App', () => {

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve(MOCK_151_POKEMON_DATA),
      })
    );
  });
  afterEach(() => {
    window.fetch = initialFetch;
  });

  it('should render', async () => {
    await act(async () => {
      render(<App />);
    });

    const appContainer = screen.getByTestId('app');

    expect(appContainer).toBeInTheDocument();
    expect(screen.getByText('All Pokemon')).toBeInTheDocument();
    expect(screen.getAllByTestId('PokemonCard').length).toEqual(151);
  });

  it('should search and filter', async () => {
    await act(async () => {
      render(<App />);
    });
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('');
    fireEvent.change(input, {target: {value: 'ch'}})
    expect(input.value).toBe('ch');
    await waitFor(() => {
      expect(screen.getAllByTestId('PokemonCard').length).toEqual(11);
    })
  })

});