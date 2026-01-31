import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConcertCard from './ConcertCard';

process.env.NEXT_PUBLIC_USER_ID = '1001';
process.env.NEXT_PUBLIC_BACKEND_URL = 'http://localhost:3000';

delete (window as any).alert;
window.alert = jest.fn();
global.fetch = jest.fn();

const mockConcert = {
  id: 1,
  name: 'Rock Night',
  description: 'A cool concert',
  totalSeats: 100,
  reservations: []
};

describe('ConcertCard Component', () => {
  const mockOnRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "Cancel" button when user has an active reservation', () => {
    const concertWithRes = {
      ...mockConcert,
      reservations: [
        {
          id: 4,
          userId: "1001",
          status: "reserved",
        }
      ]
    };

    render(<ConcertCard concert={concertWithRes} role="User" onRefresh={mockOnRefresh} />);

    const button = screen.getByRole('button', { name: /Cancel/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-red-500');
  });

  it('calls correct API URL from env when reserving', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 100 }),
    });

    render(<ConcertCard concert={mockConcert} role="User" onRefresh={mockOnRefresh} />);
    
    fireEvent.click(screen.getByText(/Reserve/i));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/reservations',
        expect.any(Object)
      );
    });
  });
});