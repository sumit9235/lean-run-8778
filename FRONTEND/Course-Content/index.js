var box1 = document.getElementById('box1');
var box2 = document.getElementById('box2');
var continueBtn = document.getElementById('continueBtn');

box1.addEventListener('click', function() {
  box1.classList.add('active');
  box2.classList.remove('active');
  continueBtn.classList.add('active');
  continueBtn.removeAttribute('disabled');
});

box2.addEventListener('click', function() {
  box2.classList.add('active');
  box1.classList.remove('active');
  continueBtn.classList.add('active');
  continueBtn.removeAttribute('disabled');
});

const beforeUnloadListener = (event) => {
  event.preventDefault();
  return (event.returnValue = "");
};

const nameInput = document.querySelector("#name");

nameInput.addEventListener("input", (event) => {
  if (event.target.value !== "") {
    addEventListener("beforeunload", beforeUnloadListener, { capture: true });
  } else {
    removeEventListener("beforeunload", beforeUnloadListener, {
      capture: true,
    });
  }
});

