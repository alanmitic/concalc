import { expect } from 'chai';
import la from './LexAn';

describe('Lexical Analayser', function() {
  it('tokensize', function() {
    let result = la.tokenize("test string");
    expect(result).equal("test string");
  });
});
