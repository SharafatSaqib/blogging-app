
'use client'
import Header from '../components/Header';
import { Provider } from 'react-redux';  
import { store } from '../store/index'; 


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        <Provider store={store}>  
          <Header />
          <main className="container">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
