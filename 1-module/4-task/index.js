function checkSpam(str) {
  spamFingerPrint1 = '1xBet'.toLowerCase();
  spamFingerPrint2 = 'XXX'.toLowerCase();

  return str.toLowerCase().includes(spamFingerPrint1) || str.toLowerCase().includes(spamFingerPrint2);
}
