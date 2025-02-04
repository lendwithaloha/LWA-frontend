import React from 'react';

interface ApprovalStatementProps {
  statement: string;
}

export default function ApprovalStatement({ statement }: ApprovalStatementProps) {
  return (
    <div className="bg-gray-100 flex flex-col p-2 my-4">
      <h1>Reason</h1>
      <p className="">{statement}</p>
    </div>
  );
}
