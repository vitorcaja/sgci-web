// Função para aplicar a máscara de CPF ou CNPJ
export function aplicarMascara(value) {
  // Remove todos os caracteres não numéricos
  let numericValue = value.replace(/\D/g, '');

  // Aplica a máscara de CPF ou CNPJ dependendo do tamanho da string
  if (numericValue.length <= 11) {
    // Máscara de CPF: XXX.XXX.XXX-XX
    return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  } else {
    // Máscara de CNPJ: XX.XXX.XXX/XXXX-XX
    return numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
}

// Função para validar o CPF
export function validarCpf(cpf) {
  // Expressão regular para verificar se o CPF tem 11 números
  if (!/\d{11}/.test(cpf)) return false;

  // Lógica de validação (simplificada) para CPF
  cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  const invalidCpfs = [
    '00000000000', '11111111111', '22222222222', '33333333333',
    '44444444444', '55555555555', '66666666666', '77777777777',
    '88888888888', '99999999999'
  ];
  if (invalidCpfs.includes(cpf)) return false;

  // Validação dos dígitos verificadores
  let soma = 0;
  let digitos = cpf.slice(0, 9);
  let peso = [10, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 9; i++) {
    soma += parseInt(digitos[i]) * peso[i];
  }
  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;

  soma = 0;
  digitos = cpf.slice(0, 10);
  peso = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 10; i++) {
    soma += parseInt(digitos[i]) * peso[i];
  }
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;

  return cpf[9] == digito1 && cpf[10] == digito2;
}

// Função para validar o CNPJ
export function validarCnpj(cnpj) {
  // Expressão regular para verificar se o CNPJ tem 14 números
  if (!/\d{14}/.test(cnpj)) return false;

  // Lógica de validação (simplificada) para CNPJ
  cnpj = cnpj.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  const invalidCnpjs = [
    '00000000000000', '11111111111111', '22222222222222', '33333333333333',
    '44444444444444', '55555555555555', '66666666666666', '77777777777777',
    '88888888888888', '99999999999999'
  ];
  if (invalidCnpjs.includes(cnpj)) return false;

  // Validação dos dígitos verificadores
  let soma = 0;
  let digitos = cnpj.slice(0, 12);
  let peso = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    soma += parseInt(digitos[i]) * peso[i];
  }
  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;

  soma = 0;
  digitos = cnpj.slice(0, 13);
  peso = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 13; i++) {
    soma += parseInt(digitos[i]) * peso[i];
  }
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;

  return cnpj[12] == digito1 && cnpj[13] == digito2;
}
