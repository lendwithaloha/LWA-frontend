export type DocumentStatus = "Pending" | "Approved" | "Rejected";

export interface Document {
  id: string;
  name: string;
  status: DocumentStatus;
  reason?: string;
}

export interface DocumentSection {
  title: string;
  documents: Document[];
}
