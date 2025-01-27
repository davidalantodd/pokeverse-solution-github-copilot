# Pokeverse

Pokemon Wiki

## Built With
- ⚛️  [React](https://reactjs.org/)
- 📦  [Parcel](https://parceljs.org/)
- 🧪  [Jest](https://jestjs.io/)
- 🧪⚛️  [Testing Library / React](https://testing-library.com/docs/react-testing-library/setup)
- 🐱 [PokeApi](https://pokeapi.co/)

## Getting Started

- Fork this repo, clone to your desktop, and install dependencies:
  ```sh
  npm install
  ```
- Start the server, and navigate to `localhost:1234`
  ```sh
  npm run start
  ```
- Run the test suite
  ```sh
  npm run test
  ```
- Lint `.js` and `.jsx` files
  ```sh
  npm run lint
  ```

## Optimizations using GitHub Copilot

This branch of the repo (#week-4-github-copilot-refactor)  was refactored using GitHub Copilot. The following optimizations were made:
- Implemented a caching mechanism in `PokemonCard.js` to store fetched data and reuse it if available.
- Debounced the search input in `App.js` to limit the rate at which the search state is updated.

You can view the full write-up on this [Project Documentation repo](https://github.com/davidalantodd/project-1-github-copilot).


---

> Made with ♥️
