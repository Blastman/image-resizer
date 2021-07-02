import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import BatchDisplay from './BatchDisplay';

const Application = () => (
  <div className="w-100 h-100">
    <BatchDisplay />
  </div>
);

export default hot(Application);
