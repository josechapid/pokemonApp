
const initialState = {
  pokemonList: [], //lista de pokemons mostrados
  filters:{
    name: "", //filtro por nombre 
  },
  searchQuery: "", //busqueda por nombre de pokemon
  currentPage: 1, //pagina actual para el paginado
};

const homeReducer = (state= initialState, action) =>{
  switch(action.type){
    case 'SET_POKEMON_LIST':
      return {
        ...state,
        pokemons: action.payload,
      };
    case 'APPLY_FILTERS':
      return {
        ...state,
        filters:{
          ...state.filters,
          ...action.payload,
        },
      };
      case 'SET_SEARCH_QUERY':
        return {
          ...state,
          searchQuery: action.payload,
        };
      case 'SET_CURRENT_PAGE':
        return {
          ...state,
          currentPage: action.payload,
        }
        default: return state;
  }

};

export default homeReducer;
