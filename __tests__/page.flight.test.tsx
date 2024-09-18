import { beforeAll, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import PageFlight from '../src/app/page/flight/page';
import { afterEach, describe } from 'node:test';

describe('Page Flight', () => {
    beforeAll(() => {
        render(<PageFlight />);
    });

    afterEach(() => {
        cleanup();
    });

    it('Input - Search', () => {
        const input = within(screen.getByPlaceholderText('Search'));
        expect(input).toBeDefined();
    });

    it('button - Refresh', () => {
        const button = screen.getByTestId('btn-refresh');
        expect(button).toBeDefined();
    });

    it('button - Add', () => {
        const button = screen.getByTestId('btn-add');
        expect(button).toBeDefined();
    });

    it('button - SignOut', () => {
        const button = screen.getByTestId('btn-signOut');
        expect(button).toBeDefined();
    });

    it('th- CODIGO', () => {
        const th = screen.getByText('CODIGO');
        expect(th).toBeDefined();
    });

    it('th- ORIGEM', () => {
        const th = screen.getByText('ORIGEM');
        expect(th).toBeDefined();
    });

    it('th- DESTINO', () => {
        const th = screen.getByText('DESTINO');
        expect(th).toBeDefined();
    });

    it('th- DATA', () => {
        const th = screen.getByText('DATA');
        expect(th).toBeDefined();
    });

    it('th- EDITAR', () => {
        const th = screen.getByText('EDITAR');
        expect(th).toBeDefined();
    });

    it('th- REMOVER', () => {
        const th = screen.getByText('REMOVER');
        expect(th).toBeDefined();
    });
});
