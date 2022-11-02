var siteName=document.getElementById('siteName');
var siteUrl=document.getElementById('siteUrl')
var alert=document.querySelector('.alert');
var bttnAdd=document.querySelector('.bttnAdd');
var deletBookmark=document.querySelector('.deletBookmark');
var error=document.getElementById('error');
var btnDelete=document.querySelectorAll('.btnDelete');
var bookMarks=[];
if(localStorage.getItem('books') != null)
{
    bookMarks = JSON.parse( localStorage.getItem('books') );
    displayBookMark();
}

function addBookMark(){
  var bookMark={
    siteName:siteName.value,
    siteUrl:siteUrl.value
  }
  var name=bookMark.siteName;
  var url=bookMark.siteUrl
  if(checkName(name) && urlCheck(url) && validationUrl()==true){
    error.style.display='none';
    error2.style.display='none';
    bookMarks.push(bookMark);
    localStorage.setItem('books' , JSON.stringify(bookMarks));
    displayBookMark();
    clear();
  
  }
  else{
    if (!checkName(name)) {
      showError("this name already exist");
  }
  if (!urlCheck(url)) {
    showUrlError("this url already exist");
  }
  if (name == null || name == "") {
    showError("Name is required");
  }
  if (url == null || url == "") {
    showUrlError("Url Field is required");
  } 
  if (validationUrl()==false) {
    showUrlError("Invalid URL");
  }
  }

}
bttnAdd.addEventListener('click',function(){
  addBookMark();
})
function displayBookMark(){
  var cartoona='';
  for(var i=0;i<bookMarks.length;i++){
    cartoona+=`      <div class="booklist m-auto mb-5 py-4">
    <div class="w-50 d-flex justify-content-between align-items-center">
      <h2>${bookMarks[i].siteName}</h2>
      <div class="discuss">
        <a href="${bookMarks[i].siteUrl}"target="_blank" class="btn btn-primary me-1">visit</a>
        <button class="btn btn-danger btnDelete">Delete</button>
    </div>
    </div>
      </div>`
      // btnDelete[i].addEventListener('click',function(){
      //   deleteBook(i);
      // })
  }
  document.querySelector('.book-container').innerHTML=cartoona;
  var delbtns=document.querySelectorAll('.btnDelete');
      for(let j=0;j<delbtns.length;j++){
        console.log(j)
        delbtns[j].addEventListener('click',function(){
          deleteBook(j)
        })
      }
}
function deleteBook(deleteIndex){
  bookMarks.splice(deleteIndex,1)
  localStorage.setItem('books' , JSON.stringify(bookMarks) );
  displayBookMark();
}

function clear(){
  siteName.value=""
  siteUrl.value="";
}

function checkName(name){
  if(name==null || name==''){
    return false;
  }
  for(var i=0;i<bookMarks.length;i++){
      if(name==bookMarks[i].siteName)
    return false;
  }
    return true;
  }
function urlCheck(url){
  if(url==null || url==''){
    return false;
  }
  for(var i=0;i<bookMarks.length;i++){
    if(url==bookMarks[i].siteUrl)
    return false;
  }
    return true;
}
function showError(massage){
  error.innerHTML=massage;
  error.style.display='block';
}
function showUrlError(massage){
  error2.innerHTML=massage;
  error2.style.display='block';
}
function validationUrl(){
  var regex=/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[A-za-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-zA-z]{2,5}(:[0-9]{1,9})?(\/.*)?$/;
  if(regex.test(siteUrl.value) == true){
    return true;
}
else{
    return false;
}
}