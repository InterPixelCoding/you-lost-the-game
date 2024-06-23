const els_struct = [
  {text: "Scroll to zoom in", z: -100, img: null},
  {text: "Scroll at your own risk!", z: 900, img: null},
  {text: "I'm warning you...", z: 1900, img: null},
  {text: "Last chance...", z: 2900, img: null},
  {text: null, z: 3900, img: 'you-lost-the-game-graphic.svg'}
]

const container = document.querySelector('section.flex.center');

function scroll_scale(el, scroll_pos, z, last, index) {
  let scale = ((Math.max(scroll_pos - z, 0)) / 100)**2;
  console.log(index)
  let modified_scale = scale;
  if(scale > 1 && scale < 20 && index > 1) {modified_scale = 1}
  if(last) {modified_scale = Math.min(scale, 1)}
  el.style.transform = `scale(${modified_scale})`;

  let blur = modified_scale / 90;
  let opacity = `${1.5 - blur}`;
  el.style.opacity = opacity;

  if(opacity <= 0) {el.remove()}
  el.style.filter = `blur(${blur}px`;
}

els_struct.forEach(function(el, index) {
  let is_text = el.text !== null;
  console.log(index)
  let dom_el;
  if(is_text) {
    dom_el = document.createElement("span");
    dom_el.textContent = el.text;
    console.log(index)
    scroll_scale(dom_el, window.scrollY, el.z, false, index);
  } else {
    dom_el = document.createElement("img");
    dom_el.src = el.img;
    scroll_scale(dom_el, window.scrollY, el.z, true, index);
  }
  container.appendChild(dom_el);

  document.addEventListener("scroll", (e) => {
    if(is_text) {scroll_scale(dom_el, window.scrollY, el.z, false)} else {scroll_scale(dom_el, window.scrollY, el.z, true)}
  })
})

