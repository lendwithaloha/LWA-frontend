interface ContactCardProps {
  email: string;
  phone: string;
}

export default function ContactCard({ email, phone }: ContactCardProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-4 w-full flex flex-col items-center text-center">
      <h3 className="font-handwriting text-lg mb-4">Contact Details</h3>
      <div className="space-y-2">
        <div>
          <p className="font-handwriting">{email}</p>
          <p className="text-gray-600 text-sm">Email</p>
        </div>
        <div>
          {" "}
          <p className="font-handwriting">{phone}</p>
          <p className="text-gray-600 text-sm">Phone</p>
        </div>
      </div>
    </div>
  );
}
