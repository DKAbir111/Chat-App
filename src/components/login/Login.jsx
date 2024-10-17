import "./login.css"
import { Avatar, TextField, Button, Typography, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
    return (
        <Box className="container">
            {/* left */}
            <Box className="leftSide" />

            {/* right */}
            <Box className="rightSide">
                <Avatar sx={{ m: 1, bgcolor: '#09daad' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: '#09daad' }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;
