const scriptEL = document.createElement('script');
scriptEL.setAttribute('src', 'https://eloquentjavascript.net/code/journal.js');
document.head.append(scriptEL);

scriptEL.addEventListener('load', function (e) {
  console.log('hello');

  console.log(JOURNAL);
});
