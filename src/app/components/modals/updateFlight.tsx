import { CEPResponse, getCEP } from '@/app/services/cep';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import MessageModal from '../shared/message';
import { isNumber } from '@/app/validations/isNumber';
import { FlightResponse, updateFlight } from '@/app/services/flights';
import Loading from '../shared/loading';

interface UpdateFlightProps {
    closeModal: () => void;
    flight: FlightResponse | undefined;
}

export default function UpdateFlightModal({
    closeModal,
    flight,
}: UpdateFlightProps) {
    const [paisOrigem, setPaisOrigem] = useState('');
    const [cepOrigem, setCepOrigem] = useState('');
    const [cepOrigemData, setCepOrigemData] = useState<CEPResponse>();
    const [paisDestino, setPaisDestino] = useState('');
    const [cepDestino, setCepDestino] = useState('');
    const [cepDestinoData, setCepDestinoData] = useState<CEPResponse>();
    const [dateTime, setDateTime] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (flight) {
            setPaisOrigem(flight.originCountry);
            setCepOrigem(flight.originCep);
            setPaisDestino(flight.destinationCountry);
            setCepDestino(flight.destinationCep);
            const saoPauloDate = new Date(flight.date).toLocaleString('sv-SE', {
                timeZone: 'America/Sao_Paulo',
                hour12: false,
            });

            const formattedDate = saoPauloDate.replace(' ', 'T').slice(0, 16);
            setDateTime(formattedDate);
        }
    }, [flight]);

    function handleChangeCepOrigem(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        if (isNumber(value)) {
            setCepOrigem(value);
        }
    }

    function handleChangeCepDestino(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const { value } = event.target;
        if (isNumber(value)) {
            setCepDestino(value);
        }
    }

    function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setDateTime(value);
    }

    async function searchCEPOrigem() {
        if (paisOrigem === 'Brasil') {
            if (!cepOrigem) {
                setErrorMessage('Digite um CEP de Origem.');
                return;
            }
            const data = await getCEP(cepOrigem);
            if (typeof data === 'string') {
                setErrorMessage(data);
            } else {
                setCepOrigemData(data);
                setErrorMessage(undefined);
            }
        } else {
            setErrorMessage('Selecione um País de origem.');
        }
    }

    async function searchCEPDestino() {
        if (paisDestino === 'Brasil') {
            if (!cepDestino) {
                setErrorMessage('Digite um CEP de Destino.');
                return;
            }
            const data = await getCEP(cepDestino);
            if (typeof data === 'string') {
                setErrorMessage(data);
            } else {
                setCepDestinoData(data);
                setErrorMessage(undefined);
            }
        } else {
            setErrorMessage('Selecione um País de Destino.');
        }
    }

    function closeMessageModal() {
        setErrorMessage(undefined);
    }

    async function handleSubmit() {
        if (!flight?.id || !dateTime) {
            setErrorMessage('ID do voo não encontrado.');
            return;
        }
        const newFlight = {
            originCountry: paisOrigem,
            originCep: cepOrigem,
            originCity: cepOrigemData?.localidade || flight?.originCity || '',
            originState: cepOrigemData?.estado || flight?.originState || '',
            destinationCountry: paisDestino,
            destinationCep: cepDestino,
            destinationCity:
                cepDestinoData?.localidade || flight?.destinationCity || '',
            destinationState:
                cepDestinoData?.estado || flight?.destinationState || '',
            date: new Date(dateTime),
        };
        if (
            !newFlight.originCountry ||
            !newFlight.originCep ||
            !newFlight.originCity ||
            !newFlight.originState ||
            !newFlight.destinationCountry ||
            !newFlight.destinationCep ||
            !newFlight.destinationCity ||
            !newFlight.destinationState ||
            !newFlight.date
        ) {
            setErrorMessage('Preencha todos os campos.');
            return;
        } else {
            setLoading(true);
            const response = await updateFlight(flight?.id, newFlight);
            if (typeof response === 'string') {
                setLoading(false);
                setErrorMessage(response);
            } else {
                setLoading(false);
                closeModal();
            }
        }
    }

    return (
        <>
            <dialog className="fixed inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                <section className="flex w-1/2 flex-col gap-2 rounded-3xl bg-white p-8 shadow-2xl drop-shadow-2xl">
                    <h1 className="text-center text-6xl font-bold text-gray-500">
                        Voo
                        <p className="text-4xl font-normal text-gray-500">
                            {flight?.code}
                        </p>
                    </h1>
                    <section className="flex flex-col items-center gap-2">
                        <section className="flex flex-col gap-2">
                            <h1 className="text-4xl font-bold italic text-gray-500">
                                Origem:
                            </h1>
                            <section className="flex gap-2">
                                <div className="flex flex-col gap-2">
                                    <label className="flex flex-col space-y-2">
                                        <select
                                            value={paisOrigem}
                                            onChange={(event) =>
                                                setPaisOrigem(
                                                    event.target.value
                                                )
                                            }
                                            className="w-full rounded-full border-white bg-white p-6 text-2xl placeholder-gray-500 shadow-2xl outline-none drop-shadow-2xl"
                                        >
                                            <option value="" disabled>
                                                Selecione o país
                                            </option>
                                            <option value="Brasil">
                                                Brasil
                                            </option>
                                        </select>
                                    </label>
                                    <label className="flex flex-col space-y-2">
                                        <input
                                            type="text"
                                            placeholder="CEP"
                                            value={cepOrigem}
                                            onChange={handleChangeCepOrigem}
                                            className="w-full rounded-full border-white bg-white p-6 text-2xl placeholder-gray-500 shadow-2xl outline-none drop-shadow-2xl"
                                        />
                                    </label>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <button
                                        onClick={searchCEPOrigem}
                                        className="h-16 rounded-full bg-gray-700 p-6 text-2xl text-white shadow-2xl hover:bg-gray-600"
                                    >
                                        <MagnifyingGlass size={16} />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="flex flex-col space-y-2">
                                        <input
                                            type="text"
                                            placeholder="Cidade"
                                            value={
                                                cepOrigemData?.localidade ||
                                                flight?.originCity ||
                                                ''
                                            }
                                            readOnly
                                            className="w-full rounded-full border-white bg-white p-6 text-2xl placeholder-gray-500 shadow-2xl outline-none drop-shadow-2xl"
                                        />
                                    </label>
                                    <label className="flex flex-col space-y-2">
                                        <input
                                            type="text"
                                            placeholder="Estado"
                                            value={
                                                cepOrigemData?.estado ||
                                                flight?.originState ||
                                                ''
                                            }
                                            readOnly
                                            className="w-full rounded-full border-white bg-white p-6 text-2xl placeholder-gray-500 shadow-2xl outline-none drop-shadow-2xl"
                                        />
                                    </label>
                                </div>
                            </section>
                        </section>
                        <section className="flex flex-col gap-2">
                            <h1 className="text-4xl font-bold italic text-gray-500">
                                Destino:
                            </h1>
                            <section className="flex gap-2">
                                <div className="flex flex-col gap-2">
                                    <label className="flex flex-col space-y-2">
                                        <select
                                            value={paisDestino}
                                            onChange={(event) =>
                                                setPaisDestino(
                                                    event.target.value
                                                )
                                            }
                                            className="w-full rounded-full border-white bg-white p-6 text-2xl placeholder-gray-500 shadow-2xl outline-none drop-shadow-2xl"
                                        >
                                            <option value="" disabled>
                                                Selecione o país
                                            </option>
                                            <option value="Brasil">
                                                Brasil
                                            </option>
                                        </select>
                                    </label>
                                    <label className="flex flex-col space-y-2">
                                        <input
                                            type="text"
                                            placeholder="CEP"
                                            value={cepDestino}
                                            onChange={handleChangeCepDestino}
                                            className="w-full rounded-full border-white bg-white p-6 text-2xl placeholder-gray-500 shadow-2xl outline-none drop-shadow-2xl"
                                        />
                                    </label>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <button
                                        onClick={searchCEPDestino}
                                        className="h-16 rounded-full bg-gray-700 p-6 text-2xl text-white shadow-2xl hover:bg-gray-600"
                                    >
                                        <MagnifyingGlass size={16} />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="flex flex-col space-y-2">
                                        <input
                                            type="text"
                                            placeholder="Cidade"
                                            value={
                                                cepDestinoData?.localidade ||
                                                flight?.destinationCity ||
                                                ''
                                            }
                                            readOnly
                                            className="w-full rounded-full border-white bg-white p-6 text-2xl placeholder-gray-500 shadow-2xl outline-none drop-shadow-2xl"
                                        />
                                    </label>
                                    <label className="flex flex-col space-y-2">
                                        <input
                                            type="text"
                                            placeholder="Estado"
                                            value={
                                                cepDestinoData?.estado ||
                                                flight?.destinationState ||
                                                ''
                                            }
                                            readOnly
                                            className="w-full rounded-full border-white bg-white p-6 text-2xl placeholder-gray-500 shadow-2xl outline-none drop-shadow-2xl"
                                        />
                                    </label>
                                </div>
                            </section>
                            <label className="flex flex-col gap-2">
                                <input
                                    type="datetime-local"
                                    id="datetime"
                                    value={dateTime}
                                    onChange={handleDateChange}
                                    className="w-full rounded-full border p-6 text-2xl placeholder-gray-500 shadow-2xl outline-none drop-shadow-2xl"
                                />
                            </label>
                            <section className="flex gap-2">
                                <button
                                    onClick={closeModal}
                                    className="w-full rounded-full bg-gray-700 p-6 text-2xl text-white shadow-2xl hover:bg-gray-600"
                                >
                                    Fechar
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="w-full rounded-full bg-gray-700 p-6 text-2xl text-white shadow-2xl hover:bg-gray-600"
                                >
                                    Atualizar
                                </button>
                            </section>
                        </section>
                    </section>
                </section>
            </dialog>
            {errorMessage && (
                <MessageModal
                    message={errorMessage}
                    closeModal={closeMessageModal}
                />
            )}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <Loading />
                </div>
            )}
        </>
    );
}
