import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AutoComplete = ({ items, label, style }) => {
    return (
        <Autocomplete
            disablePortal
            options={items}
            sx={{
                ...style,
                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: "rgb(255,255,255)",
                        transition: "border-color 0.2s ease",
                    },
                    "&:hover fieldset": {
                        borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#00e676 !important", // красная рамка
                    },
                    color: "#fff",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00e676 !important", // убирает синий
                },
                "& .MuiInputLabel-root": {
                    color: "rgba(255,255,255,0.8)",
                    transition: "color 0.2s ease",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                    color: "#00e676 !important", // красный лейбл
                },
                "& .MuiInputBase-input::placeholder": {
                    color: "#fff",
                    opacity: 1,
                },
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        style: { color: "#fff" },
                    }}
                    InputLabelProps={{
                        style: { color: "#fff" },
                    }}
                />
            )}
        />
    );
};

export default AutoComplete;
