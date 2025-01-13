import {api} from "boot/axios.js";
import {Notify} from "quasar";

export class PessoaService {
  path = '/pessoas';

  create (pessoa){
//    pessoa.estadoCivil = pessoa.estadoCivilField.value
    return api.post(this.path, pessoa)
      .then(response => {
        console.log('Resposta:', response.data);
      })
      .catch(error => {
        if(error.response.data.messages){
          Notify.create(error.response.data.messages);
        }else{
          Notify.create(error.response.data.message);
        }

        // Rejeita a promise para que o catch na chamada seja acionado
        return Promise.reject(error);  // Propaga o erro para o catch externo
      });
  }
}

export const pessoaService = new PessoaService();
