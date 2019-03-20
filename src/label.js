'use strict';

let hash = Object.create(null);
hash.DIV = '0';
hash.P = '1';
hash.A = '2';
hash.SPAN = '3';
hash.UL = '4';
hash.LI = '5';
hash.OL = '6';
hash.DL = '7';
hash.DD = '8';
hash.DT = '9';
hash.STRONG = 'A';
hash.B = 'B';
hash.SPAN = 'C';
hash.TABLE = 'D';
hash.TH = 'E';
hash.TD = 'F';
hash.PRE = 'G';
hash.INPUT = 'H';
hash.SELECT = 'I';
hash.OPTION = 'J';
hash.TEXTAREA = 'K';
hash.FONT = 'L';
hash.EM = 'M';
hash.SMALL = 'M';

export default {
  encode(s) {
    return hash[s] || s;
  },
  decode(s) {},
};
