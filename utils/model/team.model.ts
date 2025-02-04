// Define type for Team Members
interface TeamMember {
    name: string;
    role: string;
    email: string;
  }
  
  // Define type for Third Party Contacts
  interface ThirdPartyContact {
    name: string;
    role: string;
    email: string;
  }
  
  // Define type for Messages
  interface Message {
    sender: string;
    timestamp: string; // Could be a Date type or string formatted timestamp
    content: string;
  }

  export type Team ={
teamMember:TeamMember[];
thirdPartyContact:ThirdPartyContact[];
message:Message[];
  }