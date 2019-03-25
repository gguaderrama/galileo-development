// Dependencies
import React from 'react';

// Routes
import indexRoutes from 'routes/index.jsx';

const AppContext = React.createContext(indexRoutes);
export default AppContext;
export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
