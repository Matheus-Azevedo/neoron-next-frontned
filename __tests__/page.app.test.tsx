import { beforeAll, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import PageApp from '../src/app/page';
import { afterEach, describe } from 'node:test';

describe('Login Page', () => {
    beforeAll(() => {
        render(<PageApp />);
    });

    afterEach(() => {
        cleanup();
    });

    it('h1 - New Airlines', () => {
        const h1 = within(screen.getByText('New Airlines'));
        expect(h1).toBeDefined();
    });

    it('Image - Hero', () => {
        const img = screen.getByAltText('Hero');
        expect(img).toBeDefined();
    });

    it('h1 - N-Air Access', () => {
        const h1 = within(screen.getByText('N-Air Access'));
        expect(h1).toBeDefined();
    });

    it('input - email', () => {
        const input = screen.getByPlaceholderText('Usuário');
        expect(input).toBeDefined();
    });

    it('input - password', () => {
        const input = screen.getByPlaceholderText('Senha');
        expect(input).toBeDefined();
    });

    it('button - Log in', () => {
        const button = screen.getByText('Log in');
        expect(button).toBeDefined();
    });
});
