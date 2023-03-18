async function imageAPI() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random/?client_id=7rXj2FW6zgoWwZPCCAsoTjc_9fX0Jkq8jHhCwMiIpQ0&count=15`
    );
    const data = await response.json();
    data.forEach((img) => {
      const html = `<div class="container"><a href=${img.links.html} target="_blank"><img class="image" src=${img.urls.regular} alt="${img.alt_description}"  title="${img.alt_description}" /></a></div>`;
      document.body.innerHTML = `${document.body.innerHTML} ${html}`;
    });
    imgObserver();
  } catch (error) {}
}

imageAPI();

function imgObserver() {
  const lastIMG = document.body.lastChild;
  let callback = (entries) => {
    if (entries[0].isIntersecting) {
      imageAPI();
    }
  };
  let option = {
    root: null,
    threshold: 0.1,
  };
  let observer = new IntersectionObserver(callback, option);
  observer.observe(lastIMG);
}
