// Page enter
window.addEventListener("DOMContentLoaded", ()=>{
  document.body.classList.add("enter");
});

// Intercept all links
document.querySelectorAll("a").forEach(link=>{
  if(link.href && !link.href.includes("#")){
    link.addEventListener("click", e=>{
      e.preventDefault();
      document.body.classList.remove("enter");
      document.body.classList.add("exit");

      setTimeout(()=>{
        window.location.href = link.href;
      },400);
    });
  }
});
