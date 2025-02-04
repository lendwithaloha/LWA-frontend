import { TextField, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const SearchTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    paddingLeft: "40px",
    "& fieldset": {
      borderRadius: "6px",
    },
  },
});

interface DocumentHeaderProps {
  onSearch: (query: string) => void;
  onRequestDocument: () => void;
}

export function DocumentHeader({
  onSearch,
  onRequestDocument,
}: DocumentHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center max-md:flex-col max-md:items-stretch gap-5">
        <h1 className="text-2xl font-semibold">Documents</h1>
        <Button
          variant="contained"
          onClick={onRequestDocument}
          className="bg-primaryColor  normal-case"
        >
          Request Document
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 z-10" />
        <SearchTextField
          fullWidth
          placeholder="Search document by name..."
          onChange={(e) => onSearch(e.target.value)}
          variant="outlined"
          size="small"
        />
      </div>
    </div>
  );
}
