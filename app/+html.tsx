import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{
          __html: `
          @media (min-width: 600px) {
            body {
              background-color: #f3f4f6;
              display: flex;
              justify-content: center;
              margin: 0;
            }
            #root {
              width: 100%;
              max-width: 480px;
              min-height: 100vh;
              background-color: white;
              box-shadow: 0 0 20px rgba(0,0,0,0.05);
              position: relative;
              overflow-x: hidden;
            }
          }
        `}} />
      </head>
      <body>
        <div id="web-mobile-container" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#f3f4f6'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '480px',
            backgroundColor: '#ffffff',
            minHeight: '100vh',
            boxShadow: '0 0 20px rgba(0,0,0,0.05)',
            position: 'relative',
            overflowX: 'hidden'
          }}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
