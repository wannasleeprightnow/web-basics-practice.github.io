// Плавное перемещение к элементу, вытранному на навбаре.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

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

// Валидация введеной почты при помощи регулярки
const subscribeForm = document.getElementById("subscribeForm");
const emailInput = document.getElementById("emailInput");
const formMessage = document.getElementById("formMessage");

subscribeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    formMessage.textContent = "✓ Thank you for subscribing!";
    formMessage.style.color = "green";
    emailInput.value = "";
  } else {
    formMessage.textContent = "✗ Please enter a valid email address";
    formMessage.style.color = "red";
  }
  setTimeout(() => {
    formMessage.textContent = "";
  }, 3000);
});

const getTemplateBtn = document.getElementById('getTemplateBtn');
const templateForm = document.getElementById('templateForm');
const formContainer = document.getElementById('templateForm');

getTemplateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    templateForm.style.display = templateForm.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('requestForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = this.name.value;
    const email = this.email.value;

    try {
        const response = await fetch('submit.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email})
        });

        const data = await response.json();

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = data.message;
        
        if (data.status === 'error') {
            notification.classList.add('error');
        }
        
        document.getElementById('notificationContainer').appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 15);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 400);
        }, 3000);

        e.target.reset();
        templateForm.style.display = 'none';
    } catch (err) {
        console.error(err);
    }
});