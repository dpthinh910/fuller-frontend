import { AppProvider } from 'src/provider/app';
import { AppRoutes } from 'src/routes';
import 'src/theme/vars.less';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
