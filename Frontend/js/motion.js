// Fade page in
document.addEventListener("DOMContentLoaded", ()=>{
  document.body.classList.add("page-loaded");
});

// Page transitions
document.querySelectorAll("a").forEach(link=>{
  if(link.href){
    link.addEventListener("click", e=>{
      if(!link.href.includes("#")){
        e.preventDefault();
        document.body.classList.remove("page-loaded");
        setTimeout(()=>window.location=link.href,300);
      }
    });
  }
});

// Scroll reveal
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("reveal");
    }
  });
});

document.querySelectorAll(".animate").forEach(el=>observer.observe(el));
