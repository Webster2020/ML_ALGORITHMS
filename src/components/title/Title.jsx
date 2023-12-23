import React from 'react';
import { toBigLetters } from '../../utils/toBigLetters';

// eslint-disable-next-line react/prop-types
const Title = ({ txt }) => {
  return <h1>{toBigLetters(txt)}</h1>;
};

export default Title;
