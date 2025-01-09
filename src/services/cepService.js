import axios from 'axios';

export default {
  // Função para buscar o endereço a partir do CEP
  buscarEnderecoPorCep(cep) {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
};
