// Borrower Interface
export interface Borrower {
  id: string
  name: string
  email: string
  phoneNumber: string
  creditScore: number
  ongoingLoans: number
  dateRegistered: string
}

// Function to format IDs in "LN-000" style
const formatId = (id: number) => `LN-${id.toString().padStart(3, '0')}`

// Borrowers Data (with formatted string IDs)
export const borrowers: Borrower[] = [
  {
    id: formatId(1),
    name: "John Doe",
    email: "john@example.com",
    phoneNumber: "123-456-7890",
    creditScore: 750,
    ongoingLoans: 2,
    dateRegistered: "2023-01-15"
  },
  {
    id: formatId(2),
    name: "Jane Smith",
    email: "jane@example.com",
    phoneNumber: "987-654-3210",
    creditScore: 800,
    ongoingLoans: 0,
    dateRegistered: "2023-05-20"
  },
  {
    id: formatId(3),
    name: "Alice Johnson",
    email: "alice@example.com",
    phoneNumber: "456-789-0123",
    creditScore: 680,
    ongoingLoans: 1,
    dateRegistered: "2022-11-30"
  },
  {
    id: formatId(4),
    name: "Bob Williams",
    email: "bob@example.com",
    phoneNumber: "789-012-3456",
    creditScore: 720,
    ongoingLoans: 0,
    dateRegistered: "2023-03-10"
  },
  {
    id: formatId(5),
    name: "Eva Brown",
    email: "eva@example.com",
    phoneNumber: "234-567-8901",
    creditScore: 790,
    ongoingLoans: 3,
    dateRegistered: "2022-09-05"
  },
  {
    id: formatId(6),
    name: "Michael Davis",
    email: "michael@example.com",
    phoneNumber: "345-678-9012",
    creditScore: 700,
    ongoingLoans: 1,
    dateRegistered: "2023-06-01"
  },
  {
    id: formatId(7),
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phoneNumber: "567-890-1234",
    creditScore: 820,
    ongoingLoans: 0,
    dateRegistered: "2023-02-14"
  },
  {
    id: formatId(8),
    name: "David Taylor",
    email: "david@example.com",
    phoneNumber: "678-901-2345",
    creditScore: 650,
    ongoingLoans: 2,
    dateRegistered: "2022-12-20"
  },
  {
    id: formatId(9),
    name: "Olivia Martinez",
    email: "olivia@example.com",
    phoneNumber: "890-123-4567",
    creditScore: 775,
    ongoingLoans: 1,
    dateRegistered: "2023-04-30"
  },
  {
    id: formatId(10),
    name: "James Anderson",
    email: "james@example.com",
    phoneNumber: "901-234-5678",
    creditScore: 710,
    ongoingLoans: 0,
    dateRegistered: "2023-05-25"
  }
]
