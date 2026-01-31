import { render, screen } from '@testing-library/react';
import HistoryPage from './page';

describe('HistoryPage Timeline Logic', () => {
  it('splits a cancelled record into two table rows', async () => {
    const mockData = [{
      id: 1,
      userId: '1001',
      status: 'cancelled',
      reservedAt: new Date().toISOString(),
      cancelledAt: new Date().toISOString(),
      concert: { name: 'Jazz Fest' }
    }];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    render(<HistoryPage />);

    // Wait for data to load
    const reservedText = await screen.findByText(/reserved/i);
    const cancelledText = await screen.findByText(/cancelled/i);

    // Verify both rows exist for the same concert
    expect(reservedText).toBeInTheDocument();
    expect(cancelledText).toBeInTheDocument();
    const rows = screen.getAllByRole('row');
    // Header row + Reserved row + Cancelled row = 3
    expect(rows.length).toBe(3); 
  });
});