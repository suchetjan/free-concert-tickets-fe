# 🎫 Free Concert Tickets - Frontend

This is the **Next.js** frontend for the Free Concert Ticket Reservation System. It provides an intuitive interface for users to book seats and for admins to manage concert events and monitor system-wide statistics.

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **State Management:** React Hooks (`useState`, `useEffect`) with Layout-persistent roles.
* **API Communication:** Fetch API

## 🚀 Key Features

### 👤 User View

* **Concert Gallery:** Browse all available concerts with real-time seat availability.
* **Seat Reservation:** Instantly book a seat for a preferred concert.
* **Reservation Management:** Cancel active reservations directly from the dashboard.
* **Audit History:** View a personalized timeline of all past reservations and cancellations.

### 🔑 Admin View

* **Event Management:** Delete concerts (Soft Delete) to manage the event list.
* **Dashboard Analytics:** High-level overview of total capacity, active reservations, and total cancellations.
* **Global History:** Monitor all user activities across the platform.

### 🔄 System Highlights

* **Persistent Role Toggle:** Switch between "User" and "Admin" roles via the sidebar without losing session context.
* **Immutable Audit Trail:** The history page utilizes a `.flatMap()` logic to present a single database record as a chronological sequence of events (Reserved → Cancelled).

---

## 🏃 Getting Started

### 1. Prerequisites

* **Node.js** (v18.0.0 or higher)
* **npm** or **yarn**
* **Backend Server:** Ensure the [Backend API](https://github.com/suchetjan/free-concert-tickets-be) is running on `http://localhost:3000`.

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/suchetjan/free-concert-tickets-fe.git

# Navigate to the project directory
cd free-concert-tickets-fe

# Install dependencies
npm install

```

### 3. Run the Application

```bash
# Start the development server
npm run dev

```

The application will be available at [http://localhost:3001](http://localhost:3001).

---

## 📂 Project Structure

* `/app`: Contains the main routes (`page.tsx` for Home, `history/page.tsx` for Audit Trail).
* `/app/layout.tsx`: Houses the root layout and the persistent Role state.
* `/components`: Reusable UI components including `ConcertCard`, `Sidebar`, and `StatCard`.
* `/public`: Static assets and global styles.

## 🧪 Implementation Notes

### Single-Record Timeline

To keep the database efficient, we update a single record's status from `reserved` to `cancelled`. The frontend then dynamically expands this single record into multiple rows in the History table to provide a full audit experience.

### Real-Time Updates

The UI utilizes an `onRefresh` pattern to re-fetch data immediately after actions (Reserve/Cancel/Delete), ensuring the "Seats Available" count and Admin stats are always accurate without needing a full page reload.
