# Basis Point James Bond Ping Test

My submission for Basis Point Group test assigned to me

To view the project [click here](https://bpg-test.vercel.app/)

## Running locally

### Prerequisites

- Node.js 18+
- pnpm (recommended package manager)

### Setup Instructions

1. **Clone the repository**

`git clone https://github.com/max-carver/bpg-test cd bpg-test `

2. **Install dependencies**

   `pnpm install `

3. **Environment Setup**

Create a `.env` file in the root directory with the following variables: (See email)

`env # Database DATABASE_URL="" # NextAuth AUTH_SECRET=""`

4. **View Database**

`# Open Drizzle Studio to view database pnpm db:studio`

5. **Start the development server**

`pnpm dev `

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `pnpm dev` - Start development server with Turbo
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm db:studio` - Open Drizzle Studio

## Notes

-**API Routes**: Next.js API routes used for all database queries. Everything except authentication route `src/app/api/auth[...nextauth]/route.ts]` requires
authentication

- **Database**: Hosted PostgreSQL solution via [Neon](https://neon.com/) with [Drizzle ORM](https://orm.drizzle.team/)

- **Authentication**: Credentials provider with JWT strategy using [Auth.js (V5)](https://authjs.dev/) with role-based access control (User & Admin)

- **UI**: [ShadCN](https://ui.shadcn.com/) for ease of use with [Tailwind CSS](https://tailwindcss.com/)

- **Data Visualization**: In conjuction with ShadCN, the [Tanstack Table module](https://tanstack.com/table) was used for table creation

- **Form Validation**: Made use of [Zod](https://zod.dev/) with [React Hook Form](https://react-hook-form.com/) for client and server side data validation (also integrates nicely with ShadCN)

- **Ping System**: Random GPS coorindate generation with parent relationships
