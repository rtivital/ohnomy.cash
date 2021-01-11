import 'normalize.css';
import '@mantine/core/dist/lib.css';
import '@mantine/tag-picker/dist/lib.css';
import './styles.less';

import React from 'react';
import { render } from 'react-dom';
import App from './App';

render(<App />, document.getElementById('app'));
