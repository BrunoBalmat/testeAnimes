import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function InputCustomized({ value, onChange, onSearch }) {
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '18vw',
                backgroundColor: 'transparent',
                border: '2px solid white',
                borderRadius: '15px'
            }}
            onSubmit={(e) => {
                e.preventDefault();
                onSearch();
            }}>

            <InputBase
                sx={{
                    ml: 2,
                    flex: 1,
                    color: 'white',
                    fontSize: '1.4rem',
                    '&::placeholder': {
                        color: '#ffffff',
                        opacity: 1,
                        fontSize: '1.4rem',
                    },
                }}
                placeholder="Buscar"
                inputProps={{ 'aria-label': 'search' }}
                value={value}
                onChange={onChange}
            />
            <IconButton type="button" sx={{ p: '5px', color: 'white', fontSize: '2rem' }} aria-label="search"
                onClick={() => {
                    onSearch();
                }}
            >
                <SearchIcon fontSize="inherit" />
            </IconButton>
        </Paper>
    );
}
