import axios from 'axios';

export interface FlightRequest {
    originCountry: string;
    originCep: string;
    originCity: string;
    originState: string;
    destinationCountry: string;
    destinationCep: string;
    destinationCity: string;
    destinationState: string;
    date: Date;
}

export async function createFlight(newFlight: FlightRequest): Promise<string> {
    try {
        const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL_PROD}/flights`,
            newFlight
        );
        if (data) {
            return 'Voo criado com sucesso';
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
            return (
                (error.response?.data?.message as string) ||
                'Falha ao criar voo'
            );
        } else if (error instanceof Error) {
            console.error('Unexpected error', error.message);
            return 'Um erro inesperado ocorreu';
        }
    }
    return 'Falha ao criar voo';
}

export interface FlightResponse {
    id: number;
    code: string;
    originCountry: string;
    originCep: string;
    originCity: string;
    originState: string;
    destinationCountry: string;
    destinationCep: string;
    destinationCity: string;
    destinationState: string;
    date: string;
}

export async function getFlights(): Promise<FlightResponse[] | string> {
    try {
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL_PROD}/flights`
        );
        return data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
            return (
                (error.response?.data?.message as string) ||
                'Falha ao buscar voos'
            );
        } else if (error instanceof Error) {
            console.error('Unexpected error', error.message);
            return 'Um erro inesperado ocorreu';
        }
    }
    return 'Falha ao buscar voos';
}

export async function deleteFlight(id: number): Promise<string> {
    try {
        const { data } = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL_PROD}/flights/${id}`
        );
        console.log(data);
        if (data) {
            return 'Voo deletado com sucesso';
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
            return (
                (error.response?.data?.message as string) ||
                'Falha ao deletar voo'
            );
        } else if (error instanceof Error) {
            console.error('Unexpected error', error.message);
            return 'Um erro inesperado ocorreu';
        }
    }
    return 'Falha ao deletar voo';
}

export async function updateFlight(
    id: number,
    newFlight: FlightRequest
): Promise<string> {
    try {
        const { data } = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL_PROD}/flights/${id}`,
            newFlight
        );
        console.log(data);
        if (data) {
            return 'Voo atualizado com sucesso';
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
            return (
                (error.response?.data?.message as string) ||
                'Falha ao atualizar voo'
            );
        } else if (error instanceof Error) {
            console.error('Unexpected error', error.message);
            return 'Um erro inesperado ocorreu';
        }
    }
    return 'Falha ao atualizar voo';
}
