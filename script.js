var img = ['https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/278372822_3190004404633194_4940394047553997604_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=soUaUJobrikAX8luzyG&_nc_ht=scontent.fdad3-5.fna&oh=00_AfD76HMib3zY2e-5Wq_X2poMK55N6UG1TRWUwtJl_UQGBw&oe=642F0CD1','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTCmobJNxROK4k7i41AoV9J-6LX7u0OJZ4_A&usqp=CAU','https://1.bp.blogspot.com/-U2mQmXXM80Q/YEAycHWe6ZI/AAAAAAAASH4/ABfWygPusD4BKkU8qD9K3lUs2MgloOOOgCLcBGAsYHQ/s2048/Saints%2BVol%2B2.jpg','https://wallpapercave.com/dwp2x/wp4470110.jpg','https://media.gettyimages.com/vectors/cute-cartoon-dachshunds-in-love-vector-id865392634?s=2048x2048','https://media.gettyimages.com/vectors/heart-shaped-sea-otters-in-love-vector-graphics-vector-id1183276814?s=2048x2048']

var old = 0
var clicks = 0
function randomize() {
  let root = document.documentElement
  root.style.setProperty('--image','url('+img[old]+')')
  old++
  if(old > 5) {
    old = 0
  }  
  var ul = document.querySelectorAll('#puzz i');
  for(var i=0;i<ul.length;i++){
    ul[i].style.left = Math.random()*(window.innerWidth-100) + 'px'
    ul[i].style.top = Math.random()*(window.innerHeight-100) + 'px'
  }
  // for (var i = ul.children.length; i >= 0; i--) {
  //   ul.appendChild(ul.children[Math.random() * i | 0]);    
  // }
}
randomize()

function reload() {
  var done = document.querySelectorAll('.done')
  done.forEach(function(e){
    e.classList.toggle('done')
  })
  var dropped = document.querySelectorAll('.dropped')
  dropped.forEach(function(e){
    e.classList.toggle('dropped')
  })
  var allDone = document.querySelector('.allDone')
  allDone.style = ''
  allDone.classList.toggle('allDone')
}


// mobile functionality
var p = document.querySelectorAll('#puzz i')
p.forEach(function(e){
  e.addEventListener('mousedown', function(){
    clicks++
    document.querySelector('#clicks').innerHTML = clicks
  })
  e.addEventListener('click', function(){
    if(document.querySelector('.clicked')){
      document.querySelector('.clicked').classList.toggle('clicked')
      e.classList.toggle('clicked')
    } else {
      e.classList.toggle('clicked')  
    }    
  })
})

var fp = document.querySelectorAll('#puz i')
fp.forEach(function(el){
  el.addEventListener('click', function(){
    if(document.querySelector('.clicked')){
      var c = document.querySelector('.clicked')
      if(c.classList.contains(el.classList)) {
        el.classList.add('dropped')
        c.classList.add('done')
        c.classList.toggle('clicked')

        if(document.querySelectorAll('.dropped').length == 9) {
          document.querySelector('#puz').classList.add('allDone')
          document.querySelector('#puz').style.border = 'none'  
          document.querySelector('#puz').style.animation = 'allDone 1s linear forwards'

          setTimeout(function(){
            reload()
            randomize()            
          },1500)
        } 
      }
    }    
  })
})

// desktop drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.className);  
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text")

  if(ev.target.className == data){
    ev.target.classList.add('dropped')
    document.querySelector('.'+data+"[draggable='true']").classList.add('done')

    if(document.querySelectorAll('.dropped').length == 9) {
      document.querySelector('#puz').classList.add('allDone')
      document.querySelector('#puz').style.border = 'none'  
      document.querySelector('#puz').style.animation = 'allDone 1s linear forwards'  

      setTimeout(function(){
        reload()
        randomize()        
      },1500)
    }    
  }  
}