'use client';

import CreateFlight from '@/app/components/modals/createFlight';
import MessageModal from '@/app/components/shared/message';
import UpdateFlight from '@/app/components/modals/updateFlight';
import {
    deleteFlight,
    FlightResponse,
    getFlights,
} from '@/app/services/flights';
import {
    Info,
    Plus,
    Trash,
    SignOut,
    ArrowsClockwise,
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loading from '@/app/components/shared/loading';

export default function FlightPage() {
    const [search, setSearch] = useState('');
    const [openModal, setOpenModal] = useState(0);
    const [flightsData, setFlightsData] = useState<FlightResponse[]>([]);
    const [flightData, setFlightData] = useState<FlightResponse>();
    const [message, setMessage] = useState<string>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetch() {
            setLoading(true);
            const response = await getFlights();
            if (typeof response === 'string') {
                setLoading(false);
                setMessage(response);
            } else {
                setLoading(false);
                setFlightsData(response);
            }
        }
        fetch();
    }, []);

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value);
    }

    function closeModal() {
        setOpenModal(0);
    }

    function closeMessageModal() {
        setMessage(undefined);
    }

    async function handleRefresh() {
        setLoading(true);
        const response = await getFlights();
        if (typeof response === 'string') {
            setLoading(false);
            setMessage(response);
        } else {
            setLoading(false);
            setFlightsData(response);
        }
    }

    async function handleDelete(id: number) {
        setLoading(true);
        const response = await deleteFlight(id);
        if (typeof response === 'string') {
            const newFlights = flightsData.filter((flight) => flight.id !== id);
            setLoading(false);
            setFlightsData(newFlights);
            setMessage(response);
        } else {
            setLoading(false);
            setMessage(response);
        }
    }

    return (
        <>
            <main className="flex h-screen flex-col space-y-4 p-6">
                {/* Primeira seção */}
                <section className="relative flex h-auto w-full items-center justify-between">
                    <label className="mr-4 flex-grow">
                        <input
                            type="email"
                            placeholder="Search"
                            value={search}
                            onChange={handleSearch}
                            className="w-full max-w-lg rounded-full bg-white p-4 text-2xl placeholder-gray-500 shadow-2xl outline-none drop-shadow-2xl"
                        />
                    </label>
                    {/* Botão redondo */}
                    <div className="flex space-x-4">
                        <button
                            onClick={handleRefresh}
                            className="flex aspect-square h-20 items-center justify-center rounded-full bg-gray-700 text-white shadow-2xl drop-shadow-2xl hover:bg-gray-600"
                        >
                            <ArrowsClockwise size={32} />
                        </button>
                        <button
                            onClick={() => setOpenModal(1)}
                            className="flex aspect-square h-20 items-center justify-center rounded-full bg-gray-700 text-white shadow-2xl drop-shadow-2xl hover:bg-gray-600"
                        >
                            <Plus size={32} />
                        </button>
                        <Link href="/">
                            <button className="flex aspect-square h-20 items-center justify-center rounded-full bg-gray-700 text-white shadow-2xl drop-shadow-2xl hover:bg-gray-600">
                                <SignOut size={32} />
                            </button>
                        </Link>
                    </div>
                </section>

                {/* Segunda seção */}
                <section className="flex h-full w-full overflow-auto rounded-3xl bg-white p-8 shadow-2xl drop-shadow-2xl">
                    {/* Conteúdo da segunda seção */}
                    <table className="max-w-8xl h-40 w-full rounded-3xl text-2xl text-gray-500">
                        <thead className="rounded-full border-b-4 border-gray-500">
                            <tr>
                                <th className="w-1/6 py-2 text-center">#</th>
                                <th className="w-1/6 py-2 text-center">
                                    CÓDIGO
                                </th>
                                <th className="w-1/6 py-2 text-center">
                                    ORIGEM
                                </th>
                                <th className="w-1/6 py-2 text-center">
                                    DESTINO
                                </th>
                                <th className="w-1/6 py-2 text-center">DATA</th>
                                <th className="w-1/6 py-2 text-center">
                                    EDITAR
                                </th>
                                <th className="w-1/6 py-2 text-center">
                                    REMOVER
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {flightsData
                                .filter((flight) => {
                                    if (search === '') {
                                        return flight;
                                    } else if (
                                        flight.code
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ||
                                        flight.originCity
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ||
                                        flight.destinationCity
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ||
                                        new Date(flight.date)
                                            .toLocaleDateString()
                                            .includes(search)
                                    ) {
                                        return flight;
                                    }
                                })
                                .map((flight, index) => (
                                    <tr key={index}>
                                        <td className="py-2">
                                            <div className="flex h-full w-full items-center justify-center">
                                                {index + 1}
                                            </div>
                                        </td>
                                        <td className="py-2">
                                            <div className="flex h-full w-full items-center justify-center text-center">
                                                {flight.code}
                                            </div>
                                        </td>
                                        <td className="py-2">
                                            <div className="flex h-full w-full items-center justify-center">
                                                {flight.originCity}
                                            </div>
                                        </td>
                                        <td className="py-2">
                                            <div className="flex h-full w-full items-center justify-center">
                                                {flight.destinationCity}
                                            </div>
                                        </td>
                                        <td className="py-2">
                                            <div className="flex h-full w-full items-center justify-center text-center">
                                                {new Date(
                                                    flight.date
                                                ).toLocaleDateString()}
                                                {' - '}
                                                {new Date(
                                                    flight.date
                                                ).toLocaleTimeString()}
                                            </div>
                                        </td>
                                        <td className="py-2">
                                            <div className="flex h-full w-full items-center justify-center">
                                                <button
                                                    onClick={() => {
                                                        setOpenModal(2);
                                                        setFlightData(flight);
                                                    }}
                                                    className="h-10 w-10 border-none bg-transparent text-gray-500 hover:text-gray-300"
                                                >
                                                    <Info size={32} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-2">
                                            <div className="flex h-full w-full items-center justify-center">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(flight.id)
                                                    }
                                                    className="h-10 w-10 border-none bg-transparent text-gray-500 hover:text-gray-300"
                                                >
                                                    <Trash size={32} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </section>
            </main>
            {openModal === 1 && <CreateFlight closeModal={closeModal} />}
            {openModal === 2 && (
                <UpdateFlight closeModal={closeModal} flight={flightData} />
            )}
            {message && (
                <MessageModal
                    message={message}
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
