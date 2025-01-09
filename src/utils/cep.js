// Função para aplicar a máscara ao CEP (XXXXX-XXX)
export function aplicarMascaraCep(cep) {
  return cep
    .replace(/\D/g, '') // Remove qualquer caractere não numérico
    .replace(/^(\d{5})(\d{1,3})/, '$1-$2'); // Aplica a máscara
}

// Função para validar o CEP (considera que o CEP deve ter 8 números)
export function validarCep(cep) {
  // Removendo qualquer caractere não numérico e verificando se tem 8 dígitos
  const cepValido = cep.replace(/\D/g, '');
  return cepValido.length === 8;
}
