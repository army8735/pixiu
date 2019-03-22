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
hash.STRONG = 'a';
hash.B = 'b';
hash.U = 'c';
hash.TABLE = 'd';
hash.TH = 'e';
hash.TD = 'f';
hash.PRE = 'g';
hash.INPUT = 'h';
hash.SELECT = 'i';
hash.OPTION = 'j';
hash.TEXTAREA = 'k';
hash.FONT = 'l';
hash.EM = 'm';
hash.SMALL = 'n';
hash.ABBR = 'o';
hash.ADDRESS = 'p';
hash.ARTICLE = 'q';
hash.ASIDE = 'r';
hash.BIG = 's';
hash.BLOCKQUOTE = 't';
hash.BUTTON = 'u';
hash.CAPTION = 'v';
hash.CENTER = 'w';
hash.DEL = 'x';
hash.FIELDSET = 'y';
hash.FONT = 'z';
hash.FOOTER = 'A';
hash.HEADER = 'B';
hash.SECTION = 'C';
hash.H1 = 'D';
hash.H2 = 'E';
hash.H3 = 'F';
hash.H4 = 'G';
hash.H5 = 'H';
hash.H6 = 'I';
hash.I = 'J';
hash.INS = 'K';
hash.LABEL = 'L';
hash.MENU = 'M';
hash.OPTION = 'N';
hash.S = 'O';
hash.Q = 'P';
hash.SUB = 'Q';
hash.SUP = 'R';
hash.STRIKE = 'S';

let reverse = Object.create(null);
for(let i in hash) {
  reverse[hash[i]] = i;
}

module.exports = {
  encode(s) {
    return hash[s] || s;
  },
  decode(s) {
    return reverse[s] || s;
  },
};
