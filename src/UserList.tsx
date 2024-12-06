import { useState, useEffect, useContext, useMemo } from 'react';
import { ThemeContext } from './ThemeContext';

function UserList() {
  const { theme, toggleTheme, themeStyles } = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const filteredUsers = useMemo(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return sortOrder === 'asc'
      ? filtered.sort((a, b) => a.name.localeCompare(b.name))
      : filtered.sort((a, b) => b.name.localeCompare(a.name));
  }, [users, searchQuery, sortOrder]);

  return (
    <div style={{ ...themeStyles[theme], minHeight: '100vh', padding: '20px' }}>
      <button onClick={toggleTheme}>
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>

      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ margin: '10px 0', padding: '5px' }}
      />

      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
