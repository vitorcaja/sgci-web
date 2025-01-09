<template>
  <div>
    <q-form ref="formPessoa" @submit="cadastrar" class="bg">
      <div class="bg"></div>
      <div class="main-container">
        <div class="q-mb-md">
          <h4 class="title">Cadastrar Pessoa</h4>
          <div class="divisor-inline"></div>
        </div>
        <div class="q-pa-md" style="margin-top: -30px;">
          <h4 class="subtitle">Dados Básicos</h4>
          <div class="row q-col-gutter-lg q-mb-sm">
            <div class="col-6">
              <q-input v-model="pessoa.nome" label="Nome" :rules="[val=> !(val == null || val === '') || 'Campo obrigatório']" dense />
            </div>
            <div class="col-3">
              <q-input v-model="pessoa.documento" @input="aplicarMascaraCpfCnpj" @blur="validarCpfCnpj" label="Documento"
                       placeholder="Digite CPF ou CNPJ" :rules="[val=> !(val == null || val === '') || 'Campo obrigatório']" dense />
              <span v-if="pessoa.erro" style="color: red;">{{ pessoa.erro }}</span>
            </div>
            <div class="col-3">
              <q-input v-model="pessoa.profissao" label="Profissão" :rules="[val=> !(val == null || val === '') || 'Campo obrigatório']" dense />
            </div>
          </div>
          <div class="row q-col-gutter-lg q-mb-sm">
            <div class="col-6">
              <q-field :rules="[val=> !(val == null || val === '') || 'Campo obrigatório']" dense label="Tipo de Pessoa" lazy-rules borderless stack-label>
                <q-option-group v-model="pessoa.tipo" :options="tipos" color="primary" inline />
              </q-field>
            </div>
            <div class="col-3">
              <q-select filled v-model="pessoa.estadoCivil" :options="estadosCivil" label="Estado Civil"
                        :rules="[val=> !(val == null || val === '') || 'Campo obrigatório']" stack-label dense denseOpts />
            </div>
          </div>
        </div>
        <div class="q-pa-md" style="margin-top: -50px;">
          <h4 class="subtitle">Dados Endereço</h4>
          <div class="row q-col-gutter-lg q-mb-sm">
            <div class="col-3">
              <q-input v-model="pessoa.endereco.cep" label="CEP"
                       :rules="[val => !!val || 'Campo obrigatório',
                                  val => validarCep(val) || pessoa.erroCEP]"
                       @input="aplicarMascaraCep"
                       :error-message="pessoa.erroCEP ? pessoa.erroCEP : 'CEP inválido'" dense />
<!--              <span v-if="pessoa.erroCEP" style="color: red;">{{ pessoa.erroCEP }}</span>-->
            </div>
            <div class="col-3" v-if="pessoa.endereco.estado">
              <q-select filled v-model="pessoa.endereco.estado" :options="estados" label="Estado"
                        :rules="[val=> !(val == null || val === '') || 'Campo obrigatório']" stack-label dense denseOpts readonly />
            </div>
            <div class="col-6" v-if="pessoa.endereco.estado">
              <q-select filled v-model="pessoa.endereco.cidade" :options="cidades" label="Cidade"
                        :rules="[val=> !(val == null || val === '') || 'Campo obrigatório']" stack-label dense denseOpts readonly />
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-lg q-mb-sm">
          <div class="col-6" v-if="pessoa.endereco.estado">
            <q-input v-model="pessoa.endereco.bairro" label="Bairro"
                     :rules="[val=> !(val == null || val === '') || 'Campo obrigatório']" dense readonly />
          </div>
          <div class="col-4" v-if="pessoa.endereco.estado">
            <q-input v-model="pessoa.endereco.rua" label="Rua"
                     :rules="[val=> !(val == null || val === '') || 'Campo obrigatório']" dense readonly />
          </div>
          <div class="col-2" v-if="pessoa.endereco.estado">
            <q-input v-model="pessoa.endereco.numero" label="Número"
                     :rules="[val=> !(val == null || val === '') || 'Campo obrigatório']" dense />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div style="float: right;">
              <q-btn label="Voltar" style="margin-right: 10px;" no-caps class="btn-voltar" />
              <q-btn label="Cadastrar" no-caps class="btn-cadastrar" type="submit" />
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import {ref} from "vue";
import { validarCpf, validarCnpj } from '../../utils/cpfCnpj';
import CepService from "src/services/cepService.js";
import {aplicarMascaraCep, validarCep} from "src/utils/cep.js";

export default {
  name: 'create-edit-pessoa',
  setup () {
    const pessoa = ref({
      nome: null,
      documento: null,
      tipo: null,
      profissao: null,
      estadoCivil: null,
      endereco: ref({
        cep: null,
        estado: null,
        ibge: null,
        cidade: null,
        bairro: null,
        rua: null,
        numero: null
      }),
      erro: null,
      erroCEP: null
    });

    return {
      pessoa,
      tipos: [
        {
          label: 'Pessoa Física',
          value: 'PESSOA_FISICA'
        },
        {
          label: 'Pessoa Jurídica',
          value: 'PESSOA_JURIDICA'
        }
      ],
      estadosCivil: [
        { label: 'Solteira', value: 'SOLTEIRA' },
        { label: 'Solteiro', value: 'SOLTEIRO' },
        { label: 'Casada', value: 'CASADA' },
        { label: 'Casado', value: 'CASADO' },
        { label: 'Divorciada', value: 'DIVORCIADA' },
        { label: 'Divorciado', value: 'DIVORCIADO' }
      ],
      estados: [
        { label: 'Acre', value: 'AC' },
        { label: 'Alagoas', value: 'AL' },
        { label: 'Amapá', value: 'AP' },
        { label: 'Amazonas', value: 'AM' },
        { label: 'Bahia', value: 'BA' },
        { label: 'Ceará', value: 'CE' },
        { label: 'Distrito Federal', value: 'DF' },
        { label: 'Espírito Santo', value: 'ES' },
        { label: 'Goiás', value: 'GO' },
        { label: 'Maranhão', value: 'MA' },
        { label: 'Mato Grosso', value: 'MT' },
        { label: 'Mato Grosso do Sul', value: 'MS' },
        { label: 'Minas Gerais', value: 'MG' },
        { label: 'Pará', value: 'PA' },
        { label: 'Paraíba', value: 'PB' },
        { label: 'Paraná', value: 'PR' },
        { label: 'Pernambuco', value: 'PE' },
        { label: 'Piauí', value: 'PI' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Rio Grande do Norte', value: 'RN' },
        { label: 'Rio Grande do Sul', value: 'RS' },
        { label: 'Rondônia', value: 'RO' },
        { label: 'Roraima', value: 'RR' },
        { label: 'Santa Catarina', value: 'SC' },
        { label: 'São Paulo', value: 'SP' },
        { label: 'Sergipe', value: 'SE' },
        { label: 'Tocantins', value: 'TO' }
      ],
      cidades: []
    };
  },
  methods: {
    // Aplica a máscara automaticamente enquanto o usuário digita
    aplicarMascaraCpfCnpj() {
      // Remove qualquer formatação anterior e aplica a máscara
      let valor = this.pessoa.documento.replace(/\D/g, ''); // Remove tudo que não é número

      // Aplica a máscara de CPF ou CNPJ dependendo do número de caracteres
      if (valor.length <= 11) {
        // Se for CPF (11 dígitos)
        this.pessoa.documento = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      } else {
        // Se for CNPJ (14 dígitos)
        this.pessoa.documento = valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      }
    },

    // Valida o CPF ou CNPJ após a perda de foco
    validarCpfCnpj() {
      let valor = this.pessoa.documento.replace(/\D/g, ''); // Remove qualquer formatação

      // Valida CPF ou CNPJ
      if (valor.length <= 11) {
        // Valida CPF
        this.pessoa.erro = validarCpf(valor) ? "" : "CPF inválido!";
      } else {
        // Valida CNPJ
        this.pessoa.erro = validarCnpj(valor) ? "" : "CNPJ inválido!";
      }

      // Aplica a máscara novamente após a validação
      this.aplicarMascaraCpfCnpj();
    },

    // Aplica a máscara automaticamente
    aplicarMascaraCep() {
      this.pessoa.endereco.cep = aplicarMascaraCep(this.pessoa.endereco.cep);
    },

    // Valida o CEP
    validarCep() {
      if(validarCep(this.pessoa.endereco.cep)){
        this.pessoa.erroCEP = null;
        this.buscarEndereco();
        this.aplicarMascaraCep();
      }else if(this.pessoa.endereco.cep.length!==7){
        // Se o CEP for válido, a flag de erro é resetada
        this.pessoa.erroCEP = 'CEP deve ter 8 dígitos.';
      }
    },
    async buscarEndereco() {
      if (this.pessoa.endereco.cep.length === 8) {
        try {
          const response = await CepService.buscarEnderecoPorCep(this.pessoa.endereco.cep); // Chamando o serviço
          if (response.data.erro) {
            this.pessoa.erroCEP = 'CEP não encontrado.';
            this.resetDadosCEP();
          } else {
            this.resetDadosCEP();
            const data = response.data;
            this.pessoa.endereco.estado = data.uf;
            this.pessoa.endereco.cidade = data.localidade;
            this.pessoa.endereco.ibge = data.ibge;
            this.cidades.push({label:data.localidade, value:data.ibge});
            this.pessoa.endereco.bairro = data.bairro;
            this.pessoa.endereco.rua = data.logradouro;
            this.pessoa.erroCEP = ''; // Limpa a mensagem de erro, se houver
//            this.aplicarMascaraCep();
          }
        } catch (error) {
          console.error(error);  // Loga o erro no console
          this.pessoa.erroCEP = 'Erro ao buscar o endereço.';
          this.resetDadosCEP();
        }
      } else if(this.pessoa.endereco.cep.length!==9){
        this.pessoa.erroCEP = 'CEP deve ter 8 dígitos.';
      }
    },
    resetDadosCEP(){
      this.pessoa.endereco.estado = null;
      this.pessoa.endereco.cidade = null;
      this.pessoa.endereco.ibge = null;
      this.cidades = [];
      this.pessoa.endereco.bairro = null;
      this.pessoa.endereco.rua = null;
    },
    cadastrar() {
      console.log('invocou o método cadastrar!');
    }
  }
}
</script>
