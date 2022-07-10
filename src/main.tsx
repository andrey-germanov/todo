import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App';
import './views/styles/reset.scss';
import './views/styles/common.scss';
import { withTranslation } from 'react-i18next';
import { setupTranslation } from './i18n/i18n';
import { Auth0Provider } from '@auth0/auth0-react';

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//     <App />
// )
setupTranslation().then(() => {
    const AppContainer = withTranslation()(App);
    ReactDOM.render(
      <React.Suspense fallback={'Loading'}>
        <Auth0Provider
          domain="dev-ufz05wjq.us.auth0.com"
          clientId="NmNtaXKZAzyKjKVissbYbifjCfGESxwg"
          redirectUri={window.location.origin}
        >
          <AppContainer />
        </Auth0Provider>
      </React.Suspense>,
      document.getElementById("root")
    );
  });