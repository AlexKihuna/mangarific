function openUrlInNewTab(url){
  chrome.tabs.query({
		currentWindow: true,
		active: true
	}, function(tab) {
		chrome.tabs.create({
			"url": url
		});
	});
}

function updateBadge(colour, newText){
  chrome.browserAction.setBadgeBackgroundColor({ color: colour});
  chrome.browserAction.setBadgeText({ text: newText});
}
// DB stuff

function getDB(name, version){
  var request = indexedDB.open(name, version);
  request.onupgradeneeded = function() {
    // The database did not previously exist, so create object stores and indexes.
    var db = request.result;
    if (!db.objectStoreNames.contains("manga")){
      var store = db.createObjectStore("manga", {keyPath: "mangaHomeUrl"});
      var titleIndex = store.createIndex("by_title", "mangaTitle", {unique: true});
    }
  }
  request.onsuccess = function() {
    console.log("DB successfully connected to.");
    db = request.result;
    //Listen for add clicks
  }
  request.onerror = function() {
    console.log("Error while connecting to the database.")
  }
}

function addManga(manga) {
  var transaction = db.transaction(["manga"], "readwrite");
  var store = transaction.objectStore("manga");
  var request = store.add(manga, 1);
  request.onerror = function() {
    console.log("Error", request.error.name);
  }
  request.onsuccess = function(e) {
    console.log("Added", manga.mangaTitle, "successfully");
  }
}

function readMangas() {
  var transaction = db.transaction(["manga"], "readonly");
  var objectStore = transaction.objectStore("manga");
  var cursor = objectStore.openCursor();

  cursor.onsuccess = function() {
    var res = cursor.result;
    if(res) {
        console.log("Key", res.key);
        console.dir("Data", res.value);
        res.continue();
    }
  }

  cursor.onerror = function() {
    console.log("Error occurred while reading mangas")
  }
}
