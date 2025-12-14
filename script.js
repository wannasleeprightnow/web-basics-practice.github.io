// Плавное перемещение в самый верх, при нажатии на кнопку scrollToTop
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Плавное появление элементов, когда пользователь проматывает страницу вниз
const fadeElements = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    appearOnScroll.unobserve(entry.target);
  });
},
appearOptions);

fadeElements.forEach((element) => {
  appearOnScroll.observe(element);
});

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const formMessage = document.getElementById("formMessage");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  fetch('submit.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      formMessage.textContent = "✓ " + data.message;
      formMessage.style.color = "green";
      usernameInput.value = "";
      passwordInput.value = "";
    } else {
      formMessage.textContent = "✗ " + data.message;
      formMessage.style.color = "red";
    }
  })
  .catch(error => {
    console.error('Error:', error);
    formMessage.textContent = "✗ Server error. Please try again later.";
    formMessage.style.color = "red";
  });

  setTimeout(() => {
    formMessage.textContent = "";
  }, 5000);
});