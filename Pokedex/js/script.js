// Seleciona elementos do HTML e os armazena em variáveis
const pokemonName = document.querySelector('.pokemon__name'); // Nome do Pokémon
const pokemonNumber = document.querySelector('.pokemon__number'); // Número do Pokémon
const pokemonImage = document.querySelector('.pokemon_image'); // Imagem do Pokémon

const form = document.querySelector('.form'); // Formulário de pesquisa
const input = document.querySelector('.input__search'); // Campo de entrada para pesquisa
const buttonPrev = document.querySelector('.btn-prev'); // Botão "Prev"
const buttonNext = document.querySelector('.btn-next'); // Botão "Next"

// Define o ID do Pokémon inicial
let searchPokemon = 1;

// Função assíncrona para buscar dados do Pokémon na API POKEAPI
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); // Faz requisição para a PokeAPI
  
  if (APIResponse.status === 200) { // Verifica se a resposta da API foi bem-sucedida
    const data = await APIResponse.json(); // Converte a resposta para JSON
    return data; // Retorna os dados do Pokémon
  }
}

// Função assíncrona para exibir os dados do Pokémon na página
const renderPokemon = async (pokemon) => {
  // Exibe "Loading..." enquanto a requisição está em andamento
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon); // Chama a função para buscar os dados do Pokémon


  //Condicional para buscar o pokemon de cordo com numero e nome
  if (data) { // Se os dados do Pokémon existirem
    pokemonImage.style.display = 'block'; // Exibe a imagem do Pokémon
    pokemonName.innerHTML = data.name; // Atualiza o nome do Pokémon
    pokemonNumber.innerHTML = data.id; // Atualiza o número do Pokémon
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; // Define a imagem animada do Pokémon de acordo com o CAMINHO que se segiu na API
    input.value = ''; // Limpa o campo de entrada após a pesquisa
    searchPokemon = data.id; // Atualiza o ID do Pokémon atual
  } else { // Caso o Pokémon não seja encontrado
    pokemonImage.style.display = 'none'; // Esconde a imagem do Pokémon
    pokemonName.innerHTML = 'Not found :c'; // Exibe mensagem de erro
    pokemonNumber.innerHTML = ''; // Limpa o número do Pokémon
  }
}

// Função para capturar o envio do formulário de pesquisa
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Impede que a página recarregue ao enviar o formulário
  renderPokemon(input.value.toLowerCase()); // Chama a função para buscar o Pokémon digitado pelo usuário mesmo escrevendo com letra maiuscula
});

// Função para o botão "Prev", busca o Pokémon anterior
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) { // Garante que o ID do Pokémon seja maior que 1
    searchPokemon -= 1; // Decrementa o ID do Pokémon usando um contador
    renderPokemon(searchPokemon); // Atualiza a exibição
  }
});

// Função para o botão "Next", busca o próximo Pokémon
buttonNext.addEventListener('click', () => {
  searchPokemon += 1; // Incrementa o ID do Pokémon usando um contador
  renderPokemon(searchPokemon); // Atualiza a exibição
});

// Renderiza o primeiro Pokémon ao carregar a página
renderPokemon(searchPokemon);
