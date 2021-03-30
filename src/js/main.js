function headerBurgerInit() {
  const burgerItem = document.querySelector(".burger");
  const menu = document.querySelector(".header__nav");
  const menuCloseItem = document.querySelector(".nav__close");
  burgerItem.addEventListener("click", () => {
    menu.classList.add("nav--active");
    burgerItem.classList.add("burder--hide");
  });

  menuCloseItem.addEventListener("click", () => {
    menu.classList.remove("nav--active");
    burgerItem.classList.remove("burder--hide");
  });
}

function smoothScroll() {
  const menu = document.querySelector(".header__nav");
  const burgerItem = document.querySelector(".burger");
  var linkNav = document.querySelectorAll('[href^="#"]'),
    V = 0.2;
  for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener(
      "click",
      function (e) {
        e.preventDefault();

        menu.classList.remove("nav--active");
        burgerItem.classList.remove("burder--hide");

        let w = window.pageYOffset,
          hash = this.href.replace(/[^#]*(.*)/, "$1");
        let t = document.querySelector(hash).getBoundingClientRect().top;
        let start = null;
        requestAnimationFrame(step);
        function step(time) {
          if (start === null) start = time;
          let progress = time - start,
            r =
              t < 0
                ? Math.max(w - progress / V, w + t)
                : Math.min(w + progress / V, w + t);
          window.scrollTo(0, r);
          if (r != w + t) {
            requestAnimationFrame(step);
          } else {
            location.hash = hash;
          }
        }
      },
      false
    );
  }
}

function getCurrentYear() {
  const year = new Date().getFullYear();
  const placeY = document.getElementsByClassName("year");
  for (let i = 0; i < placeY.length; i++) {
    var elemY = placeY[i];
    elemY.innerHTML = year;
  }
}

function createCustomSelectFunctionality() {
  let selectHeader = document.querySelectorAll(".select__header");
  let selectItem = document.querySelectorAll(".select__item");
  const companyTypeSelect = document.querySelector(".js-company__value");
  const aboutUsSelect = document.querySelector(".js-about__value");

  selectHeader.forEach((item) => {
    item.addEventListener("click", selectToggle);
  });

  selectItem.forEach((item) => {
    item.addEventListener("click", selectChoose);
  });

  function selectToggle() {
    // document.querySelectorAll(".select").forEach((item) => {
    //   item.classList.remove("is-active");
    // });
    this.parentElement.classList.toggle("is-active");
  }

  function selectChoose() {
    let text = this.innerText,
      select = this.closest(".select"),
      currentText = select.querySelector(".select__current");

    currentText.innerText = text;
    currentText.classList.add("select__current--selected");
    select.classList.remove("is-active");

    if (select.classList.contains("select-type")) {
      companyTypeSelect.value = text;
    } else {
      aboutUsSelect.value = text;
    }
  }
}

function validationForm() {
  const form = document.getElementById("form"),
    username = document.getElementById("username"),
    email = document.getElementById("email"),
    companyName = document.getElementById("company-name"),
    companyType = document.getElementById("company-type"),
    aboutUs = document.getElementById("about-us"),
    message = document.getElementById("message");

  form.addEventListener("submit", (e) => {
    console.log("CLICK");
    e.preventDefault();

    checkInputs();
  });

  function checkInputs() {
    let usernameValue = username.value.trim(),
      emailValue = email.value.trim(),
      companyNameValue = companyName.value.trim(),
      messageValue = message.value.trim(),
      companyTypeValue = companyType.value,
      aboutUsValue = aboutUs.value;

    if (usernameValue === "") {
      setErrorFor(username, "Username cannot be blank");
    } else {
      setSuccessFor(username);
    }

    if (emailValue === "") {
      setErrorFor(email, "Email cannot be blank");
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "Not a valid email");
    } else {
      setSuccessFor(email);
    }

    if (companyNameValue === "") {
      setErrorFor(companyName, "Field cannot be blank");
    } else {
      setSuccessFor(companyName);
    }

    if (companyTypeValue === "") {
      setErrorFor(companyType, "Field cannot be blank");
    } else {
      setSuccessFor(companyType);
    }

    if (aboutUsValue === "") {
      setErrorFor(aboutUs, "Field cannot be blank");
    } else {
      setSuccessFor(aboutUs);
    }

    if (messageValue === "") {
      setErrorFor(message, "Field cannot be blank");
    } else {
      setSuccessFor(message);
    }

    if (
      usernameValue &&
      emailValue &&
      isEmail(emailValue) &&
      companyNameValue &&
      companyTypeValue &&
      messageValue &&
      grecaptcha.getResponse()
    ) {
      const blockStart = document.querySelector(".start");

      blockStart.classList.add("submited");

      setTimeout(function () {
        blockStart.classList.remove("submited");
      }, 4000);
    }
  }

  function setErrorFor(input, message) {
    const formWrap = input.parentElement;
    const small = formWrap.querySelector("small");

    formWrap.classList.remove("success");
    formWrap.classList.add("error");
    small.innerText = message;
  }

  function setSuccessFor(input) {
    const formWrap = input.parentElement;
    formWrap.classList.remove("error");
    formWrap.classList.add("success");
  }

  function isEmail(email) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    return reg.test(email);
  }

  function checkCompanyDomain(email) {
    const domainName = email.slice(email.indexOf("@") + 1, email.length);
    const pattern = "smart-hub.io";

    return domainName.toLowerCase().localeCompare(pattern) === 0;
  }
}

function main() {
  headerBurgerInit();
  smoothScroll();
  getCurrentYear();
  createCustomSelectFunctionality();
  validationForm();
}

document.addEventListener("DOMContentLoaded", main);
