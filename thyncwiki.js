//TODO: add html5 history/hash history
//TODO: introduce actual markdown editor: https://github.com/benweet/stackedit
//Browser...
(function() {
  var actionButton,
      articleSource,
      articleRendered,
      articleName,
      appWrapper,
      //store history, current page, editing or not, home page
      appState = {editing: false, home: 'index', article: ""};

  appWrapper = document.getElementById('wiki-app');
  actionButton = document.getElementById('article-action-button');
  articleSource = document.getElementById('article-source');
  articleNameEdit = document.getElementById('article-name-edit')
  articleNameRendered = document.getElementById('article-name')
  articleRendered = document.getElementById('article-rendered');

  //load existing article or clear fields/enter edit mode for new article
  function loadArticle(wikiWord) {
    var content = localStorage['thyncwiki' + wikiWord];
    if(content) {
      articleSource.value = content;
    } else {
      articleSource.value = '';
      enterEditMode();
    }
    articleNameEdit.value = wikiWord;
    renderWikiWords();
  }

  function saveArticle(wikiWord) {
    localStorage['thyncwiki' + wikiWord] = articleSource.value;
  }

  function renderWikiWords() {
    articleRendered.innerHTML = marked(articleSource.value).replace(
        /([A-Z]+[a-z]+){2,}/g,'<span class="wiki-word">$&</span>');
    articleNameRendered.innerHTML = articleNameEdit.value;
  }

  function enterEditMode() {
    appState.editing = true;
    appWrapper.className = 'editing';
    actionButton.innerHTML = 'Save';
  }

  actionButton.addEventListener('click', function(e) {
    appState.editing = !appState.editing;

    if(appState.editing) {
      enterEditMode();
    } else {
      appWrapper.className = '';
      actionButton.innerHTML = 'Edit';
      saveArticle(articleNameEdit.value);
      renderWikiWords();
    }
  });

  articleRendered.addEventListener('click', function(e) {
    //determine if click was on a WikiWord and loadArticle
    if(e.target.className.match(/wiki-word/)) {
      loadArticle(e.target.innerText);
    }
  });

  //load index (or default article)
  loadArticle('ThingsAndStuff');

})();
//server...
//var request = require('request'),
    //http = require('http');

//http.createServer(function(req, res) {
  //res.writeHead(200, {'Content-Type': 'text/html'});
  //res.end('Stuff is the responsed');
//}).listen(1234);
