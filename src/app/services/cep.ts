import axios from 'axios';

export interface CEPResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    unidade: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

// Get CEP data from ViaCEP, is a API for CEP data in Brazil, if you need add other countries, you will need add a new API
export async function getCEP(cep: string): Promise<CEPResponse | string> {
    try {
        const { data } = await axios.get(
            `https://viacep.com.br/ws/${cep}/json/`
        );
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            return 'Não foi possível encontrar o CEP.';
        } else {
            console.error('Unexpected error', error);
            return 'Um erro inesperado ocorreu';
        }
    }
}
