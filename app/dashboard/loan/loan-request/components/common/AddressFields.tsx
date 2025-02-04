import { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface Suggestion {
  text: string;
  magicKey: string;
}

interface AddressFieldsProps {
  onAddressChange: (address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  }) => void;
}

export default function AddressFields({ onAddressChange }: AddressFieldsProps) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Parse address string
  const parseAddressString = (addressString: string) => {
    const parts = addressString.split(",").map((part) => part.trim());

    // Handle components from the back
    const country = parts.pop() || ""; // Last part is the country
    const zip = parts.pop()?.match(/\d+/)?.[0] || ""; // Second to last is ZIP
    const state = parts.pop() || ""; // Third to last is the state
    const city = parts.pop() || ""; // Fourth to last is the city

    // Remaining parts are the street
    const street = parts.join(", ");

    // Concatenate state and country
    const stateWithCountry = country ? `${state}, ${country}` : state;

    return { street, city, state: stateWithCountry, zip };
  };

  // Fetch suggestions
  const fetchSuggestions = async (input: string) => {
    if (input.length < 3) return;

    try {
      const params = new URLSearchParams({
        text: input,
        category: "Address",
        f: "json",
      });
      const response = await fetch(
        `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?${params}`
      );
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    fetchSuggestions(value);
  };

  const handleAddressSelect = (index: number) => {
    const selected = suggestions[index];
    if (selected) {
      const newAddress = parseAddressString(selected.text);
      setAddress(newAddress);
      onAddressChange(newAddress);
      setInputValue(selected.text);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev === null ? 0 : Math.min(prev + 1, suggestions.length - 1)));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev === null ? 0 : Math.max(prev - 1, 0)));
    } else if (e.key === "Enter" && selectedIndex !== null) {
      handleAddressSelect(selectedIndex);
    }
  };

  return (
    <div className="space-y-4">
      {/* Street Input */}
      <div>
        <TextField
          id="street"
          name="street"
          label="Street"
          fullWidth
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {suggestions.length > 0 && (
          <ul className="mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
            {suggestions.map((item, index) => (
              <MenuItem
                key={item.magicKey}
                onClick={() => handleAddressSelect(index)}
                selected={index === selectedIndex}
                className={`${
                  index === selectedIndex ? "bg-blue-100" : ""
                }`}
              >
                {item.text}
              </MenuItem>
            ))}
          </ul>
        )}
      </div>

      {/* City Input */}
      <div>
        <TextField
          id="city"
          name="city"
          label="City"
          fullWidth
          variant="outlined"
          value={address.city}
          onChange={(e) =>
            setAddress((prev) => ({
              ...prev,
              city: e.target.value,
            }))
          }
        />
      </div>

      {/* State and ZIP Inputs */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <TextField
            id="state"
            name="state"
            label="State"
            fullWidth
            variant="outlined"
            value={address.state}
            onChange={(e) =>
              setAddress((prev) => ({
                ...prev,
                state: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex-1">
          <TextField
            id="zip"
            name="zip"
            label="ZIP Code"
            fullWidth
            variant="outlined"
            value={address.zip}
            onChange={(e) =>
              setAddress((prev) => ({
                ...prev,
                zip: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}
