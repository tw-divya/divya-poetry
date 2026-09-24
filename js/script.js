document.addEventListener("DOMContentLoaded", () => {

  const header =
    document.querySelector(".site-header");

  const menuToggle =
    document.querySelector(".menu-toggle");

  const mobileNavigation =
    document.querySelector(".mobile-navigation");

  const mobileLinks =
    document.querySelectorAll(
      ".mobile-navigation a"
    );

  const pages =
    document.querySelectorAll(".page");

  const revealCards =
    document.querySelectorAll(
      ".reveal-card"
    );

  const poemToggle =
    document.querySelector(".poem-toggle");

  const poemPanel =
    document.querySelector("#poem-full");

  const poemClose =
    document.querySelector(".poem-close");

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* ===============================
     MOBILE MENU
  =============================== */

  function closeMobileMenu() {

    if (
      !menuToggle ||
      !mobileNavigation
    ) {
      return;
    }

    menuToggle.classList.remove(
      "is-open"
    );

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "मेन्यू खोलें"
    );

    mobileNavigation.classList.remove(
      "is-open"
    );

    mobileNavigation.setAttribute(
      "aria-hidden",
      "true"
    );
  }


  function openMobileMenu() {

    if (
      !menuToggle ||
      !mobileNavigation
    ) {
      return;
    }

    menuToggle.classList.add(
      "is-open"
    );

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    menuToggle.setAttribute(
      "aria-label",
      "मेन्यू बंद करें"
    );

    mobileNavigation.classList.add(
      "is-open"
    );

    mobileNavigation.setAttribute(
      "aria-hidden",
      "false"
    );
  }


  if (menuToggle) {

    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          menuToggle.getAttribute(
            "aria-expanded"
          ) === "true";

        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }

      }
    );

  }


  mobileLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        closeMobileMenu
      );

    }
  );


  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closeMobileMenu();

        if (
          poemToggle &&
          poemToggle.getAttribute(
            "aria-expanded"
          ) === "true"
        ) {
          closePoem();
        }

      }

    }
  );


  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth >= 768) {
        closeMobileMenu();
      }

    }
  );


  /* ===============================
     HEADER SCROLL
  =============================== */

  function updateHeader() {

    if (!header) {
      return;
    }

    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 20
    );
  }


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  updateHeader();


  /* ===============================
     PAGE REVEAL
  =============================== */

  if (
    reduceMotion ||
    !("IntersectionObserver" in window)
  ) {

    pages.forEach(
      (page) => {

        page.classList.add(
          "is-visible"
        );

      }
    );

    revealCards.forEach(
      (card) => {

        card.classList.add(
          "is-revealed"
        );

      }
    );

  } else {

    const pageObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.08,

          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    pages.forEach(
      (page) => {

        pageObserver.observe(page);

      }
    );


    const cardObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(
            (entry, index) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }

              setTimeout(
                () => {

                  entry.target.classList.add(
                    "is-revealed"
                  );

                },
                index * 80
              );

              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: 0.15,

          rootMargin:
            "0px 0px -30px 0px"
        }
      );


    revealCards.forEach(
      (card) => {

        cardObserver.observe(card);

      }
    );

  }


  /* ===============================
     POEM
  =============================== */

  function openPoem() {

    if (
      !poemToggle ||
      !poemPanel
    ) {
      return;
    }

    poemToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    poemPanel.hidden = false;
  }


  function closePoem() {

    if (
      !poemToggle ||
      !poemPanel
    ) {
      return;
    }

    poemToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    poemPanel.hidden = true;

    poemToggle.focus();
  }


  if (poemToggle) {

    poemToggle.addEventListener(
      "click",
      () => {

        const expanded =
          poemToggle.getAttribute(
            "aria-expanded"
          ) === "true";

        if (expanded) {
          closePoem();
        } else {
          openPoem();
        }

      }
    );

  }


  if (poemClose) {

    poemClose.addEventListener(
      "click",
      closePoem
    );

  }


  /* ===============================
     SMOOTH ANCHOR SCROLLING
  =============================== */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          (event) => {

            const targetId =
              link.getAttribute(
                "href"
              );

            const target =
              targetId
                ? document.querySelector(
                    targetId
                  )
                : null;

            if (!target) {
              return;
            }

            event.preventDefault();

            target.scrollIntoView({
              behavior:
                reduceMotion
                  ? "auto"
                  : "smooth",

              block: "start"
            });

            history.replaceState(
              null,
              "",
              targetId
            );

          }
        );

      }
    );


  /* ===============================
     MAGNETIC BUTTON MOVEMENT
  =============================== */

  if (
    !reduceMotion &&
    window.matchMedia(
      "(pointer:fine)"
    ).matches
  ) {

    document
      .querySelectorAll(".magnetic")
      .forEach(
        (element) => {

          element.addEventListener(
            "pointermove",
            (event) => {

              const rect =
                element.getBoundingClientRect();

              const x =
                (event.clientX -
                  rect.left) /
                  rect.width -
                0.5;

              const y =
                (event.clientY -
                  rect.top) /
                  rect.height -
                0.5;

              element.style.transform =
                `translate(
                  ${x * 6}px,
                  ${y * 5}px
                )`;

            }
          );


          element.addEventListener(
            "pointerleave",
            () => {

              element.style.transform =
                "";

            }
          );

        }
      );

  }

});
