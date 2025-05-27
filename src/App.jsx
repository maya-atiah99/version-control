import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainRouter from './routes/MainRouter';
import { AppProvider } from './context/AppContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <Toaster position="top-right" reverseOrder={false} />
          <MainRouter />
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
