// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './reduxStateManagementFiles/store.ts'
import NotificationProvider from './utils/NotificationProvider.tsx'
import { App } from './app.tsx'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <NotificationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NotificationProvider>
  </Provider>
//   <StrictMode>
// </StrictMode>
)
