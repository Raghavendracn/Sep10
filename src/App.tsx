import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  TextField,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

interface TodoItem {
  id: number;
  text: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [counter, setCounter] = useState<number>(0);

  const addTodo = (): void => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
      setInputValue('');
    }
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <FavoriteIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React TypeScript MUI App
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Welcome Card */}
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h4" component="h1" gutterBottom>
                  Welcome to React + TypeScript + MUI!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  This is a simple demo app showcasing Material-UI components with TypeScript.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Counter Card */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Counter Demo
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h3" color="primary">
                  {counter}
                </Typography>
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => setCounter(counter + 1)}
                    sx={{ mr: 1 }}
                  >
                    +
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setCounter(counter - 1)}
                  >
                    -
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Todo List Card */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Todo List
              </Typography>
              <Box display="flex" gap={1} mb={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Add a new todo..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  size="small"
                />
                <IconButton
                  color="primary"
                  onClick={addTodo}
                  disabled={!inputValue.trim()}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <List>
                {todos.map((todo) => (
                  <ListItem key={todo.id} divider>
                    <ListItemText primary={todo.text} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        color="error"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              {todos.length === 0 && (
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  No todos yet. Add one above!
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
