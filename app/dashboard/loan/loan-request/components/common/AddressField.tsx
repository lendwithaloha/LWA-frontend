import React, { useState } from "react";
import {
    Box,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    CircularProgress,
} from "@mui/material";
import axios from "axios";

interface AddressFieldProps {
    label?: string;
    placeholder?: string;
    onSelect: (address: string) => void;
}

const AddressField: React.FC<AddressFieldProps> = ({
    label = "Property Address",
    placeholder = "Street Address/City/State/ZIP",
    onSelect,
}) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setQuery(input);

        if (input.length > 2) {
            setLoading(true);
            try {
                console.log("Fetching suggestions...");
                const response = await axios.get(
                    "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest",
                    {
                        params: {
                            text: input,
                            category: "Address",
                            f: "json",
                        },
                    }
                );
                console.log("API Response:", response.data); // Log the API response
                const suggestionsData = response.data.suggestions.map(
                    (item: { text: string }) => item.text
                );
                setSuggestions(suggestionsData);
            } catch (error) {
                console.error("Error fetching address suggestions:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (address: string) => {
        setQuery(address);
        setSuggestions([]);
        onSelect(address); // Pass the selected address to the parent component
    };

    return (
        <Box className="w-full">
            {/* Label */}
            <div className="mb-1">
                <label className="font-medium text-gray-700">{label}</label>
            </div>
            {/* Input Field */}
            <TextField
                fullWidth
                placeholder={placeholder}
                value={query}
                onChange={handleInputChange}
                InputProps={{
                    endAdornment: loading ? <CircularProgress size={20} /> : null,
                }}
            />
            {/* Suggestions List */}
            {suggestions.length > 0 && (
                <List
                    sx={{
                        border: "1px solid #ddd",
                        borderRadius: 1,
                        mt: 1,
                        maxHeight: 150,
                        overflowY: "auto",
                    }}
                >
                    {suggestions.map((suggestion, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton onClick={() => handleSelect(suggestion)}>
                                <ListItemText primary={suggestion} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default AddressField;
