/* =========================================================
   PROJECT 2 — DIVYA POETRY WEBSITE
   Main JavaScript
   ========================================================= */


/* =========================================================
   01. BASIC SETUP
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* =======================================================
     02. CURRENT YEAR
     ======================================================= */

  const yearElements = document.querySelectorAll("[data-year]");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });


  /* =======================================================
     03. ACTIVE NAVIGATION
     ======================================================= */

  const currentPage = body.dataset.page;

  const navLinks = document.querySelectorAll(
    "[data-page-link]"
  );

  navLinks.forEach((link) => {

    const linkPage = link.dataset.pageLink;

    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }

  });


  /* =======================================================
     04. MOBILE MENU
     ======================================================= */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const mobileNav =
    document.querySelector(".mobile-nav");


  function closeMobileMenu() {

    if (!menuToggle || !mobileNav) {
      return;
    }

    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");

    mobileNav.classList.remove("open");

  }


  function openMobileMenu() {

    if (!menuToggle || !mobileNav) {
      return;
    }

    menuToggle.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");

    mobileNav.classList.add("open");

  }


  if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        menuToggle.classList.contains("open");

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }

    });


    mobileNav
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener("click", () => {
          closeMobileMenu();
        });

      });


    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {
        closeMobileMenu();
      }

    });


    window.addEventListener("resize", () => {

      if (window.innerWidth > 900) {
        closeMobileMenu();
      }

    });

  }


  /* =======================================================
     05. HEADER SCROLL EFFECT
     ======================================================= */

  const header =
    document.querySelector(".site-header");


  function updateHeader() {

    if (!header) {
      return;
    }

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }


  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     06. PAGE REVEAL ANIMATION
     ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  } else {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );


    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  }


  /* =======================================================
     07. MAGNETIC BUTTONS
     ======================================================= */

  const magneticElements =
    document.querySelectorAll(".magnetic");


  if (!prefersReducedMotion) {

    magneticElements.forEach((element) => {

      element.addEventListener("mousemove", (event) => {

        const rect =
          element.getBoundingClientRect();

        const x =
          event.clientX - rect.left - rect.width / 2;

        const y =
          event.clientY - rect.top - rect.height / 2;

        const moveX = x * 0.08;
        const moveY = y * 0.08;

        element.style.transform =
          `translate(${moveX}px, ${moveY}px)`;

      });


      element.addEventListener("mouseleave", () => {

        element.style.transform = "";

      });

    });

  }


  /* =======================================================
     08. SAME-PAGE SMOOTH LINKS
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior:
            prefersReducedMotion
              ? "auto"
              : "smooth",
          block: "start"
        });

      });

    });


  /* =======================================================
     09. POETRY DATA
     
     IMPORTANT:
     The poem wording below is kept in the source form
     supplied for the project. It is NOT rewritten,
     corrected, or translated automatically.
     ======================================================= */

  const poems = [

    {
      id: 1,
      title: "सर्दी",
      themes: [
        "याद",
        "विरह",
        "उम्मीद"
      ],
      text: `Ye sardiya teri yaad le aati hai
Sath bitaye palon ko laad le aati hai
Jo suljha nahi tha kabhi, wo vivaad le aati hai 
Ye sardiya teri yaad le aati hai

Tujhe bhi Mera khyaal toh aata hoga
Mann mei koi sawaal toh aata hoga
Saal mei ek baar mere naam ki dua 
Daal toh aata hoga

Maana sab mar chuka hai 
Par umeed toh Marti nahi hai
Mai toh bikhar chuki hu
Ye umeed he hai jo bikharti nahi hai`
    },


    {
      id: 2,
      title: "जान",
      themes: [
        "दर्द",
        "विरह",
        "प्रेम"
      ],
      text: `Jis dinn Jaan niklegi meri
Uss dinn mai sochna band kar dungi
baaton ko kharochna band kar dungi
apke zakhmon ko nochna band kar dungi
Jis dinn Jaan niklegi meri
Tum zaroor aana
Or na milne ka iss baar
Koi bahana Mat bnana
Jis dinn Jaan niklegi meri`
    },


    {
      id: 3,
      title: "खुशी को सहना",
      themes: [
        "दर्द",
        "आत्मचिंतन",
        "प्रेम"
      ],
      text: `Teri ye ek nazar mujhe sone nahi deti
Kamra band karke rone baithun toh rone nahi deti
Taqdeer mujhe tere sath khud ko pirone nahi deti
Gam jhelne wale toh khush Raha karte hai..
Hume pucho hum toh Khushi ko bhi saha karte hai`
    },


    {
      id: 4,
      title: "रूह",
      themes: [
        "इश्क़",
        "दर्द",
        "विरह"
      ],
      text: `rooh ke bazar mei ishq sasta bohot hai
tere intzaar mei manzil kam par rasta bohot hai
Yun toh mai zara tham kar saas lelu
par kya karu haalat khasta bohot hai`
    },


    {
      id: 5,
      title: "पहाड़",
      themes: [
        "स्वतंत्रता",
        "जीवन",
        "आत्मचिंतन"
      ],
      text: `Pahado pe chadh ke barf pe fisalna chahti hu
Unchaion mei aasmaan se milna chahti hu
Hawaon mei tezi ko silna chahti hu
Mai kaise btau tumhe mai iss ghar se
Nikalna chahti hu`
    },


    {
      id: 6,
      title: "शोर",
      themes: [
        "दर्द",
        "जीवन",
        "रिश्ते"
      ],
      text: `Chalo Mai haari aur tum Jeet gaye
Par Ab Khush hu ki wo dinn beet gaye
Purani kyu baat karni ab usse jaane dete hai
Humne kya bura kiya usse sabko ye Btane dete hai`
    },


    {
      id: 7,
      title: "पहलगाम",
      themes: [
        "समाज",
        "इंसानियत",
        "चिंतन"
      ],
      text: `Jannat se kashmir ko khoon se rula diya
Hasste huye masumo ko hamesha ke liye sula diya
Maana tum ram ko nahi maante
Par kya insaniyat ko bhi nahi jante

Jis mitti ki tum saugandh khaate ho
Kya wo tumhe faulaad banati hai?
Parivaro ka khoon baha kar ghar chale aaye
Kya tumhari ma tumhe aulad bulati hai?

Dharm jaati ke andhere mei
Krurta ke basere mei
Kaha tak dekh sakoge
Kya ab Masjid mei matha tek sakoge?

Wo jo ghar lautne ki aas mei the
Jinke bache unke paas mei the
Kya kabhi khud ko maaf kar paoge
Apni banduk pe lage khoon saaf kar paoge?

Bhul ko maafi mil sakti hai
Jurm mei maafi nahi hoti
Badlaav ke iss daur mei
Badle ki aag kafi nahi hoti

Insaniyat se bada majhab hogya
Dharm konsa ye toh sawaal he tha
Cheer kar dekha khoon inka
Dono ka khoon laal he tha`
    },


    {
      id: 8,
      title: "राय",
      themes: [
        "रिश्ते",
        "आत्मचिंतन",
        "जीवन"
      ],
      text: `Koi apni kahani sunaya karre toh
Sunn liya karo
Koi apna gussa dikhaya karre toh
Sunn liya karo
Koi bole do vikalpo mei se chunne ke liye
Toh samay lena
Koi karre achayi tumhari
Matt sunn na
Koi kahe mujhpe bharosa karo
Matt karna
Koi rakhe raaye apni
Hn ji thik hai keh kar
Waha se nikal jana
Ek baar jo nikal jao
Vapis mudhkar mat aana.`
    },


    {
      id: 9,
      title: "आभार",
      themes: [
        "जीवन",
        "आभार",
        "चिंतन"
      ],
      text: `Agar bistar se uth sakte ho
Roz subah jut sakte ho
Toh sar jhukaya karo
Kamiyan mat ginaya karo

Agar dosto mei shudhi hai
Buray samay mei budhi hai
Toh sar jhukaya karo
Kamiya mat bataya karo`
    },


    {
      id: 10,
      title: "कश्ती",
      themes: [
        "प्रेम",
        "विरह",
        "रिश्ते"
      ],
      text: `Alfaaz kyu kahenge, jo baat aankhe keh gyi
Jis raaste par the hum, wohi manzil kaise deh gyi
Kisne pakda hai haath kiska,
Meri kashti mei bas mai reh gyi.

Usne pucha tum toh ja rahe the
Jana bhul jate ho kya
Mere ravaiye se pachta rahe the
Pachtana bhul jate ho kya
Pyar toh mujhse karte ho
Ye batana bhul jate ho kya?

Khair btane se pyar kaha hota hai
kashti se samundar paar kaha hota hai
Seene mei teer maar te ho
Or puchte ho Ki vaar kaha hota hai?

Kya karre ab hum majboor ho gye
tujhe chahne mei baki sabse duur hogye
Meri nazron mei ab tum gir chukey ho.
Par mere dil ko tum manzur hogye.

Khair chodo ab wo baat purani
Wo mulaqaat purani, wo raat purani.
Purana ab sab kuch hai
Badale toh tum ho.
Meri aaj bhi wahi zubani
Meri aaj bhi wahi kahani.`
    },


    {
      id: 11,
      title: "उसूल",
      themes: [
        "प्रेम",
        "रिश्ते",
        "आत्मचिंतन"
      ],
      text: `jisme tum na ho
Wo mehfil mere paun ke niche hai
tu zamaane ke piche
zamana tere piche hai

samundar si jo mushkil aajaye
pareshani jb pareshani mere haatho mei thama jaye
tum mujhe tab jaane Dena
Khud ko aur peedha matt aane dena

thokar lagi toh gir gya
maano andhere se ghir gya
Darrta kisi se nahi hu
par iss bechaini se darr se darr gya

Tum neend Puri rakhte ho
Maine kal raat firr jaag kar bita di
Suna hai tumne apne kamre se
Meri wo tasveer hata di?

Baaton ki majboori hai
Firr bhi baatein adhoori hai
Tujhme aur mujh mei
Bas samajh ki doori hai

Chal tujhe jaane dete hai
Khudko ek or jeewan gawane dete hai
Tum jiyo apne usulon par
jeene Wale jeevan gaane dete hai`
    },


    {
      id: 12,
      title: "किश्मत",
      themes: [
        "प्रेम",
        "रिश्ते",
        "आभार"
      ],
      text: `sabki kismat mein pyar nahi hota
sabki kismat mein yaar nahi hota
Agr puchta hai koi haal tumhare
ya savaarta hai koi Baal tumhare
toh kismat wale ho tum

Agar koi puchta hai tumse ki
Kya baat hai aaj kal muskurate nahi ho
Mann mei koi baat ho agr
Mujhe aaj kal batate nahi ho
toh kismat wale ho tum

koi puch le ki aaj ka dinn kaisa Raha
Tumne aj kya kya kiya
kisine tumse kuch bola
ya tumne un se kuch kaha
toh kismat wale ho tum

Agr tumhare bina koi alfaaz kahe
Samajh Jaye baat tumhari
toh kismat wale ho tum
Par afsos
sabki kismat mei pyaar nahi hota
sabki kismat mei yaar nahi hota

Agar koi haath ke sath
Dil bhi milata hai
Jab Mann na ho kuch khane ka
toh apne haatho se khana khilata hai
toh kismat wale ho tum

Agar koi tumhare liye apne gusse ko
Pyar mei badalna jaanta ho
Apni jaan or tum ko
Ek samaan maanta ho
toh kismat wale ho tum

Tumse baat karne ke liye
Agar kisi ko shabdo ki zarurat na padhe
toh kismat wale ho tum
Par afsos
sabki kismat mei pyaar nahi hota
sabki kismat mei yaar nahi hota`
    },


    {
      id: 13,
      title: "पहली बारिश",
      themes: [
        "पहला प्यार",
        "याद",
        "विरह"
      ],
      text: `Har waqt hum bechain rehte hai
Kaaran hamesha tere nain rehte hai
Doobne ko duniya mei paani bohot hai
Humne teri ankhon ko chuna tha
bachpan ka har ek sapna tere sath buna tha
Kehdo ki hum toh jhuthe hai
Zindagi ke har ek faisle se toote hai
Aankhe band kar lu toh mujhe noch khati hai
Yaar mujhe pehli mohabbat ki yaad bohot aati hai

Par kab tak kisi ko yaad karte rahenge
Hamesha uske vapis aane ki fariyaad karte rahenge
Iska koi toh ant hoga
Ya jo bhula de wo sant hoga?
Ab dil ki jagah dimaag lagane lage hai
Aas paas ke log teri baatein bhulane lage hai
Ek hum he bhatke firrte hai
Or fir har mushkil mei buri tarah girrte hai
Aankhe band kar lu toh mujhe noch khati hai
Yaar mujhe pehli mohabbat ki yaad bohot aati hai`
    },


    {
      id: 14,
      title: "दरिया",
      themes: [
        "इश्क़",
        "विरह",
        "स्वीकार"
      ],
      text: `Pehle he acha tha kam se kam sheher toh aate the
Pehle he acha tha kam se kam theher toh jate the
Ab toh hume dekhte he mu fera karte ho
Din raat adayein bikhera karte ho

Shayad ye aiyashi tumhe raas nahi aati
Shayad meri khamoshi tumhe paas nahi bulati
Khair hum toh dariya hai beh jayenge
Aur Aap humare jeene ka zariya he reh jayenge

Bas ab tumhari Khushi ki khwaish hai
Pyar vagarh ye sab toh keval numaish hai
Haath nhi thaama toh kya hua
Kam se kam Ankhe milne ki toh gunjaish hai

Kuch samay mei bichad jayenge
Ek baar aankh bhar ke dekh lene do
Ye chehra kabhi dekhungi nahi
Bas ek baar apne aage dil ko sek lene do

Tumhari mashuka ki toh kismat se bhi yaari hai
tumhare dekhne se banti uski har ek sawari hai
Ek baar tum bhi dekh lo mud kar hume
Sab kehte hai ki hume ishq ki bimari hai

Jaayiz hai tumhara mujhse nafrat karna
Maine kabhi khud ko pasand nahi kiya
Aur Jaayiz hai mera tumhari iss adaa pe bhi marna
Par tumne shayad dil ke darwaze ko band nahi kiya

Par ab kya fayda
Ab aap kisi or ke ho chuke hai
Jante hai hum
Hum apko hamesha ke liye kho chuke hai

Chahe dekha mat kar
Bas paas se guzar jaaya kar
Mere sath na sahi
Apni mashuka ke sath he muskuraya kar....`
    },


    {
      id: 15,
      title: "सोने जितनी",
      themes: [
        "दर्द",
        "रिश्ते",
        "आत्मचिंतन"
      ],
      text: `तुमने बोला कि मेरी एहमियत सोने जितनी है
आओ हिसाब लगाते है कि कितनी है
क्या ये वही सोना है जिससे तुम खरीदते हो
ये सोच कर कि कल इसका भाव बढ़ जाएगा
या ये वही सोना है जो हर रात
हमको हमारे बिस्तर पे मृत कर देता है
काश तुम मुझे चैन मानते
काश तुम मुझे मेरे जितना जानते
पर तुम खुद को भी नहीं जानते हो
इसीलिए सोने का भाव बढ़ते ही अपनी माँ का कंगन बेच आते हो
खुद ही हर रिश्ते का फंदा खींच आते हो
क्या मिला मुझे कुर्बानी देके
क्या मिला तुम्हे कहानी लेके
कहानी सुनने वाला भी तो कोई होना चाहिए
तुम चुनते हो अपने लोगों की दुनिया में से
तुम्हे चुनने वाला भी तो कोई होना चाहिए
एक समय था जब कर्ज चुका दिया था मैंने
किसी को सुनाने लायक किस्सा कमाया था मैंने
तुम कहते हो कि हर एक किस्से को अलग घर दो
मुझ में से अपने हिस्से को अलग कर दो
जिससे अलग करोगे मुझे वो हिस्सा भी तुम्हारा होगा
मैं साथ तुम्हारे हुई भी तो गली लकड़ी का सहारा होगा
अब क्या करोगे तुम इस सहारे का
और मेरे बिना देखे नज़ारे का
तुमने बोला था मेरी एहमियत सोने जितनी है...`
    }

  ];


  /* =======================================================
     10. POEMS PAGE
     ======================================================= */

  const poemList =
    document.querySelector("#poem-list");

  const poemSearch =
    document.querySelector("#poem-search");

  const poemFilters =
    document.querySelector("#poem-filters");

  const poemCount =
    document.querySelector("#poem-count");

  const poemEmpty =
    document.querySelector("#poem-empty");


  if (poemList) {

    let activeTheme = "सभी";
    let searchTerm = "";


    const allThemes = [
      ...new Set(
        poems.flatMap((poem) => poem.themes)
      )
    ];


    /* -----------------------------------------------------
       Create filters
       ----------------------------------------------------- */

    if (poemFilters) {

      poemFilters.innerHTML = "";


      const allButton =
        document.createElement("button");

      allButton.type = "button";
      allButton.textContent = "सभी";

      allButton.classList.add("active");

      allButton.addEventListener("click", () => {

        activeTheme = "सभी";

        updateFilterButtons();

        renderPoems();

      });


      poemFilters.appendChild(allButton);


      allThemes.forEach((theme) => {

        const button =
          document.createElement("button");

        button.type = "button";
        button.textContent = theme;

        button.addEventListener("click", () => {

          activeTheme = theme;

          updateFilterButtons();

          renderPoems();

        });


        poemFilters.appendChild(button);

      });

    }


    function updateFilterButtons() {

      if (!poemFilters) {
        return;
      }

      const buttons =
        poemFilters.querySelectorAll("button");


      buttons.forEach((button) => {

        button.classList.toggle(
          "active",
          button.textContent === activeTheme
        );

      });

    }


    /* -----------------------------------------------------
       Filter poems
       ----------------------------------------------------- */

    function getFilteredPoems() {

      return poems.filter((poem) => {

        const matchesTheme =
          activeTheme === "सभी" ||
          poem.themes.includes(activeTheme);


        const searchableText =
          `${poem.title} ${poem.text} ${poem.themes.join(" ")}`
            .toLowerCase();


        const matchesSearch =
          !searchTerm ||
          searchableText.includes(searchTerm);


        return matchesTheme && matchesSearch;

      });

    }


    /* -----------------------------------------------------
       Render poems
       ----------------------------------------------------- */

    function renderPoems() {

      poemList.innerHTML = "";

      const filteredPoems =
        getFilteredPoems();


      if (poemCount) {

        poemCount.textContent =
          `${filteredPoems.length} कविताएँ`;

      }


      if (
        poemEmpty &&
        filteredPoems.length === 0
      ) {

        poemEmpty.hidden = false;

      } else if (poemEmpty) {

        poemEmpty.hidden = true;

      }


      filteredPoems.forEach((poem) => {

        const item =
          document.createElement("article");

        item.className =
          "poem-list-item reveal";


        const number =
          document.createElement("span");

        number.className =
          "poem-list-number";

        number.textContent =
          String(poem.id).padStart(2, "0");


        const content =
          document.createElement("div");


        const title =
          document.createElement("h2");

        title.className =
          "poem-list-title";

        title.textContent =
          poem.title;


        const themes =
          document.createElement("div");

        themes.className =
          "poem-list-themes";

        themes.textContent =
          poem.themes.join(" · ");


        content.appendChild(title);
        content.appendChild(themes);


        const open =
          document.createElement("button");

        open.type = "button";

        open.className =
          "poem-list-open";

        open.textContent =
          "पढ़ें →";


        open.addEventListener("click", () => {
          openPoem(poem.id);
        });


        item.addEventListener("click", (event) => {

          if (
            event.target.closest(
              ".poem-list-open"
            )
          ) {
            return;
          }

          openPoem(poem.id);

        });


        item.appendChild(number);
        item.appendChild(content);
        item.appendChild(open);

        poemList.appendChild(item);


        if (
          prefersReducedMotion ||
          !("IntersectionObserver" in window)
        ) {

          item.classList.add("visible");

        } else {

          requestAnimationFrame(() => {
            item.classList.add("visible");
          });

        }

      });

    }


    /* -----------------------------------------------------
       Search
       ----------------------------------------------------- */

    if (poemSearch) {

      poemSearch.addEventListener(
        "input",
        () => {

          searchTerm =
            poemSearch.value
              .trim()
              .toLowerCase();

          renderPoems();

        }
      );

    }


    /* -----------------------------------------------------
       Reader
       ----------------------------------------------------- */

    const poemDialog =
      document.querySelector("#poem-reader");

    const readerClose =
      document.querySelector("#reader-close");

    const readerNumber =
      document.querySelector("#reader-number");

    const readerTitle =
      document.querySelector("#reader-title");

    const readerThemes =
      document.querySelector("#reader-themes");

    const readerText =
      document.querySelector("#reader-text");


    function openPoem(id) {

      const poem =
        poems.find(
          (item) => item.id === Number(id)
        );


      if (!poem) {
        return;
      }


      if (readerNumber) {
        readerNumber.textContent =
          `कविता ${String(poem.id).padStart(2, "0")}`;
      }


      if (readerTitle) {
        readerTitle.textContent =
          poem.title;
      }


      if (readerThemes) {
        readerThemes.textContent =
          poem.themes.join(" · ");
      }


      if (readerText) {
        readerText.textContent =
          poem.text;
      }


      if (
        poemDialog &&
        typeof poemDialog.showModal === "function"
      ) {

        poemDialog.showModal();

        document.body.style.overflow = "hidden";

      }


      const url =
        new URL(window.location.href);

      url.searchParams.set(
        "poem",
        poem.id
      );

      window.history.replaceState(
        {},
        "",
        url
      );

    }


    function closePoem() {

      if (!poemDialog) {
        return;
      }

      poemDialog.close();

      document.body.style.overflow = "";

      const url =
        new URL(window.location.href);

      url.searchParams.delete("poem");

      window.history.replaceState(
        {},
        "",
        url
      );

    }


    if (readerClose) {

      readerClose.addEventListener(
        "click",
        closePoem
      );

    }


    if (poemDialog) {

      poemDialog.addEventListener(
        "click",
        (event) => {

          if (
            event.target === poemDialog
          ) {
            closePoem();
          }

        }
      );


      poemDialog.addEventListener(
        "close",
        () => {
          document.body.style.overflow = "";
        }
      );

    }


    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape" &&
          poemDialog &&
          poemDialog.open
        ) {
          closePoem();
        }

      }
    );


    /* -----------------------------------------------------
       Initial render
       ----------------------------------------------------- */

    renderPoems();


    /* -----------------------------------------------------
       Open poem from URL
       Example:
       poems.html?poem=15
       ----------------------------------------------------- */

    const requestedPoem =
      new URLSearchParams(
        window.location.search
      ).get("poem");


    if (requestedPoem) {

      const poemExists =
        poems.some(
          (poem) =>
            poem.id === Number(requestedPoem)
        );


      if (poemExists) {

        setTimeout(() => {
          openPoem(requestedPoem);
        }, 250);

      }

    }

  }


  /* =======================================================
     11. BOOK IMAGE PARALLAX
     ======================================================= */

  const bookObjects =
    document.querySelectorAll(
      ".book-object"
    );


  if (
    !prefersReducedMotion &&
    bookObjects.length > 0
  ) {

    bookObjects.forEach((book) => {

      book.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            book.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;


          const rotateY =
            Math.max(
              -7,
              Math.min(7, x / 35)
            );


          const rotateX =
            Math.max(
              -5,
              Math.min(5, -y / 45)
            );


          const image =
            book.querySelector("img");


          if (!image) {
            return;
          }


          image.style.transform =
            `perspective(1000px)
             rotateY(${rotateY}deg)
             rotateX(${rotateX}deg)`;

        }
      );


      book.addEventListener(
        "mouseleave",
        () => {

          const image =
            book.querySelector("img");


          if (!image) {
            return;
          }


          image.style.transform = "";

        }
      );

    });

  }


  /* =======================================================
     12. PREVENT BODY LOCK AFTER PAGE RESTORATION
     ======================================================= */

  window.addEventListener(
    "pageshow",
    () => {

      document.body.style.overflow = "";

    }
  );


});

/* =========================================================
   13. SHARED LIGHT / DARK THEME
   Stores the visitor's choice and applies it on every page.
   ========================================================= */
(() => {
  const root = document.documentElement;
  const toggleButtons = document.querySelectorAll('.theme-toggle');
  const storageKey = 'divya-color-theme';

  function readSavedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.dataset.theme = isDark ? 'dark' : 'light';

    toggleButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(isDark));
      button.setAttribute(
        'aria-label',
        isDark ? 'Switch to light mode' : 'Switch to dark mode'
      );
      button.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    });

    try {
      localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
    } catch (error) {
      /* Theme still works for this page if storage is unavailable. */
    }
  }

  const savedTheme = readSavedTheme();
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  });
})();
