import { useState } from "react";
import AvatarGroup from "./avatar-group";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";

interface LoanCardProps {
  loanId: string;
  amount: number;
  borrower: string;
  eod: string;
  progress: number;
  isListView: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AdminLoanCard({
  loanId,
  amount,
  borrower,
  eod,
  progress,
  isListView,
  onEdit,
  onDelete,
}: LoanCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit();
    handleClose();
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-md ${
        isListView ? "flex items-center justify-between" : "space-y-4"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">LWA Loan ID</div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
      <div
        className={`${
          isListView ? "flex items-center space-x-6 flex-grow" : "space-y-4"
        }`}
      >
        <div
          className={`${
            isListView ? "w-1/4" : "flex justify-between items-center"
          } `}
        >
          <div className="font-medium">{loanId}</div>
        </div>

        <div
          className={`${
            isListView ? "w-1/4" : "flex justify-between items-center"
          } `}
        >
          <div className="text-sm text-gray-600">Loan Amount</div>
          <div className="font-medium">${amount.toLocaleString()}</div>
        </div>

        <div
          className={`${
            isListView ? "w-1/4" : "flex justify-between items-center"
          } `}
        >
          <div className="text-sm text-gray-600">Borrower</div>
          <div className="font-medium">{borrower}</div>
        </div>

        <div
          className={`${
            isListView ? "w-1/4" : "flex justify-between items-center"
          } `}
        >
          <div className="text-sm text-gray-600">EOD</div>
          <div className="font-medium">{eod}</div>
        </div>
      </div>

      <div className={`${isListView ? "w-1/4" : "space-y-2"}`}>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right text-sm text-gray-600">{progress}%</div>
      </div>

      <div
        className={`${
          isListView ? "flex items-center space-x-4" : "flex flex-col gap-3"
        }`}
      >
        <AvatarGroup />
        <Link
          href="/admin-dashboard/loan/details"
          className="px-4 py-2 border border-gray-300 rounded-md text-sm text-center hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          View Details
        </Link>
      </div>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
