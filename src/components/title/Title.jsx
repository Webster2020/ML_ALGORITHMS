import React from 'react';
import { toBigLetters } from '../../utils/toBigLetters';

const Title = () => {
  return (
    <h1>{toBigLetters('Hello TSX')}</h1>
  )
}

export default Title;