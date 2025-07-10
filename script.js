const container = document.querySelectorAll('.container_left, .container_right');
const text_wrapper = document.querySelector('.text_wrapper');
const logo_big = document.querySelector('.logo_big');
var in_front = false;

function isPartiallyInViewport(el) {
  const rect = el.getBoundingClientRect();
  console.log(rect.bottom > 0 && rect.top < window.innerHeight);   
  return (
    rect.bottom > 0 && rect.top < window.innerHeight  
  );
}

function get_relevant_stuff(container) {
  if (container.classList.contains('container_left')) {
      const sketchnote = container.querySelector('.sketchnote_left');
      const title = container.querySelector('.sketch_title_left');
      const description = container.querySelector('.sketch_description_left');
      const note_rect = sketchnote.getBoundingClientRect();
      move_parallaxe(note_rect, title, description, sketchnote);
  }
  if (container.classList.contains('container_right')) { 
      const sketchnote = container.querySelector('.sketchnote_right');
      const title = container.querySelector('.sketch_title_right');
      const description = container.querySelector('.sketch_description_right');
      const note_rect = sketchnote.getBoundingClientRect();
      move_parallaxe(note_rect, title, description, sketchnote); 
  }
}

function move_parallaxe(note_rect, title, description, sketchnote) {
  if (note_rect.top/document.documentElement.clientHeight < 1.0) {
      const description_rect = description.getBoundingClientRect();
      const space_to_move = note_rect.height-description_rect.height;
      const descriptionspeed = space_to_move / ((note_rect.height-description_rect.height)+document.documentElement.clientHeight);
      const scrollY = -(description_rect.top - document.documentElement.clientHeight);
      console.log(descriptionspeed,scrollY, window.scrollY)
      if (scrollY > 0 && description_rect.height < note_rect.height) { 
        description.style.transform = `translateY(${scrollY * descriptionspeed}px)`;
        //description.style.transform = `translateY(${scrollY * descriptionspeed}px)`;
      }
    }
  }


function move_between_z(sketchnote) {
  const clone = sketchnote.cloneNode(true);
  const newDiv = document.createElement('div');
  newDiv.classList.add('blurrer');
  document.body.appendChild(newDiv);
  document.body.appendChild(clone);
  clone.classList = ""
  clone.style = ""
  clone.classList.add('centered_div');
  clone.style.transform = 'translateY(0px)';
  clone.style.filter = 'blur(0px)';
  document.body.style.overflow = 'hidden';
  console.log("added new div")
  clone.addEventListener('click', () => {
    document.body.style.overflow = 'auto';
    clone.remove();
    newDiv.remove();
    console.log("window click")
  });
  newDiv.addEventListener('click', () => {
    document.body.style.overflow = 'auto';
    clone.remove();
    newDiv.remove();
    console.log("window click")
  });
}

document.querySelectorAll('.sketch_description_left, .sketch_description_right').forEach(description => {
  const text = description.querySelector(".description_text");
  description.addEventListener('click', () => {
   move_between_z(text); 
  })
});

window.addEventListener('scroll', () => {
  const titlespeed = 0.7;
  text_wrapper.style.transform = `translateY(${window.scrollY * titlespeed}px)`;
  text_wrapper.style.opacity = 1 - (window.scrollY / (document.documentElement.clientHeight * 0.9));

  container.forEach(containernode => { 
    get_relevant_stuff(containernode); 
  });
});

window.addEventListener('load', () => {
  document.body.style.visibility = "visible";
  document.body.style.backgroundColor = "white";
  console.log("Page loaded and visible");
  container.forEach(containernode => {  
    get_relevant_stuff(container[0]);
  });

});

