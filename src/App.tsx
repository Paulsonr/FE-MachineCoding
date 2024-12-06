import { ThemeProvider } from './ThemeContext';
import UserList from './UserList';

function App() {
  return (
    <ThemeProvider>
      <UserList />
    </ThemeProvider>
  );
}

export default App;
