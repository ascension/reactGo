import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import config from 'helmconfig.js';

// Remove stylesheets because we do not extract them into a css file
// in development mode


const Meta = () => (
  <Helmet
    htmlAttributes={{"lang": "en", "amp": undefined}}
    title="CoinRocket" meta={config.meta}
    link={config.link}
  />
)


ReactDOMServer.renderToString(<Meta />);
const header = Helmet.rewind();

export default header;
