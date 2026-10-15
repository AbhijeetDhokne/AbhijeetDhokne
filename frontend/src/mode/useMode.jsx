import { useContext } from 'react';
import ModeContext from './ModeContext';

// Hook accessor kept in its own module so ModeContext.jsx only
// exports components (react-refresh/only-export-components).

const useMode = () => useContext(ModeContext);

export default useMode;
