// Toggle tab showing by navigation
$("#navigation li a").click(function(e){
  var target = $(this).attr("href");
  if ($(target).length) {
    var currentlyActiveTab = $(".tab.active")
    currentlyActiveTab.toggle();
    currentlyActiveTab.toggleClass("active");
    $(target).toggle();
    $(target).toggleClass("active");
  }
  e.preventDefault();
});
// Any link should open a new tab
// $("div.manga a").on("click", function(e){
$("#mangas").on("click", "a", function(e){
  openUrlInNewTab($(this).attr("href"));
  e.preventDefault();
});
// The chapter select on change should update the value of the go button
$("div.manga select").change(function(e){
  // Go to the defined chapter
  var mangaPrefix = $(this).val();
  var url = $(this).val();
  $(this).next(".chapter-nav-button").attr("value", url);
  updateBadge("#FF0000", $(this).val());
  var manga = {
    "chapterUrlPrefix": "http://goodmanga.net/Naruto/chapter/",
    "mangaHomeUrl": "http://goodmanga.net/3/Naruto",
    "mangaTitle": "Naruto",
    "latestChapter": "400",
    "lastReadChapter": "400",
    "chapterList": ["1","2","3", "400", "401"],
    "lastCheckedOn": new Date(),
    "lastUpdatedOn": new Date()
  };
  createMangaTile(manga);
});

// Add manga div
function createMangaTile(manga) {
  var chapters="";
  $.each(manga.chapterList, function( index, value ) {
    chapters+='<option value="' + value + '">' + value + '</option>\n'
  });
  var lastReadChapterUrl = manga.chapterUrlPrefix + manga.lastReadChapter;
  var firstChapterUrl = manga.chapterUrlPrefix + manga.chapterList[0];
  var lastChapterUrl = manga.chapterUrlPrefix + manga.chapterList[manga.chapterList.length-1];
  var pci = manga.chapterList.indexOf(manga.lastReadChapter)-1;
  var previousChapterIndex = pci >= 0 ? pci : 0;
  var previousChapterUrl = manga.chapterUrlPrefix + manga.chapterList[previousChapterIndex];
  var nci = manga.chapterList.indexOf(manga.lastReadChapter)+1;
  var nextChapterIndex = nci < manga.chapterList.length ? nci : 0;
  var nextChapterUrl = manga.chapterUrlPrefix + manga.chapterList[nextChapterIndex];
  $("div.manga:last").after(
    '<div class="manga">'+
    '<p class="manga-title"><a href="' + manga.mangaHomeUrl + '">' + manga.mangaTitle + '</a></p>'+
    '<div class="actions">'+
    '<a href="' + firstChapterUrl + '"><i class="fa fa-fast-backward" title="Earliest chapter" aria-hidden="true"></i></a>'+
    '<a href="' + previousChapterUrl + '"><i class="fa fa-backward" title="Previous chapter" aria-hidden="true"></i></a>'+
    '<a href="' + lastReadChapterUrl + '"><i class="fa fa-play" title="Current chapter" aria-hidden="true"></i></a>'+
    '<a href="' + nextChapterUrl + '"><i class="fa fa-forward" title="Next chapter" aria-hidden="true"></i></a>'+
    '<a href="' + lastChapterUrl + '"><i class="fa fa-fast-forward" title="Latest chapter" aria-hidden="true"></i></a>'+
    '</div>'+
    '<div class="manga-meta">'+
    '<div class="detail-label">Last Chapter Read</div>'+
    '<div class="detail-value"><a href="' + manga.chapterUrlPrefix + manga.lastReadChapter + '">' + manga.lastReadChapter + '</a></div>'+
    '<div class="detail-label">Lastest Chapter</div>'+
    '<div class="detail-value">457</div>'+
    '<div class="clearfix"></div>'+
    '</div>'+
    '<div class="chapter-nav">'+
    '<p>Select chapter</p>'+
    '<select data-chapter-prefix="' + manga.chapterUrlPrefix + '">'+
    chapters +
    '</select>'+
    '</div>'+
    '<div class="clearfix"></div>'+
    '</div>'
  );
}

// Update tab color
// Animate the extension icon
// web storage. local storage vs webdb vs indexdb
