import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '../ContactForm';

// Mock fetch for API calls
global.fetch = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders form fields with proper labels', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText('NAME:')).toBeInTheDocument();
    expect(screen.getByLabelText('EMAIL:')).toBeInTheDocument();
    expect(screen.getByLabelText('PROJECT SUMMARY:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('updates form fields when user types', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText('NAME:');
    const emailInput = screen.getByLabelText('EMAIL:');
    const messageInput = screen.getByLabelText('PROJECT SUMMARY:');

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(messageInput).toHaveValue('Test message');
  });

  test('shows error message when form submission fails', async () => {
    const user = userEvent.setup();
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<ContactForm />);

    const nameInput = screen.getByLabelText('NAME:');
    const emailInput = screen.getByLabelText('EMAIL:');
    const messageInput = screen.getByLabelText('PROJECT SUMMARY:');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');
    await user.click(submitButton);

    await waitFor(() => {
      const alertElement = screen
        .getAllByRole('alert')
        .find((el) => el.textContent.includes('Failed to send message'));
      expect(alertElement).toBeInTheDocument();
    });
  });

  test('shows success message when form submission succeeds', async () => {
    const user = userEvent.setup();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Message sent successfully!' }),
    });

    render(<ContactForm />);

    const nameInput = screen.getByLabelText('NAME:');
    const emailInput = screen.getByLabelText('EMAIL:');
    const messageInput = screen.getByLabelText('PROJECT SUMMARY:');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/message sent successfully!/i)
      ).toBeInTheDocument();
    });
  });

  test('clears form fields after successful submission', async () => {
    const user = userEvent.setup();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Message sent successfully!' }),
    });

    render(<ContactForm />);

    const nameInput = screen.getByLabelText('NAME:');
    const emailInput = screen.getByLabelText('EMAIL:');
    const messageInput = screen.getByLabelText('PROJECT SUMMARY:');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');
    await user.click(submitButton);

    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
    });
  });

  test('disables submit button during submission', async () => {
    const user = userEvent.setup();
    fetch.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<ContactForm />);

    const nameInput = screen.getByLabelText('NAME:');
    const emailInput = screen.getByLabelText('EMAIL:');
    const messageInput = screen.getByLabelText('PROJECT SUMMARY:');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
  });

  test('sends correct data to API endpoint', async () => {
    const user = userEvent.setup();
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success' }),
    });

    render(<ContactForm />);

    const nameInput = screen.getByLabelText('NAME:');
    const emailInput = screen.getByLabelText('EMAIL:');
    const messageInput = screen.getByLabelText('PROJECT SUMMARY:');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');
    await user.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message',
        }),
      });
    });
  });

  test('shows server error message when API returns error', async () => {
    const user = userEvent.setup();
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Server error message' }),
    });

    render(<ContactForm />);

    const nameInput = screen.getByLabelText('NAME:');
    const emailInput = screen.getByLabelText('EMAIL:');
    const messageInput = screen.getByLabelText('PROJECT SUMMARY:');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(messageInput, 'Test message');
    await user.click(submitButton);

    await waitFor(() => {
      const alertElement = screen
        .getAllByRole('alert')
        .find((el) => el.textContent.includes('Server error message'));
      expect(alertElement).toBeInTheDocument();
    });
  });
});
