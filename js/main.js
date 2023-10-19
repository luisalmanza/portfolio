document.addEventListener("DOMContentLoaded", () => {

    /* MENU */
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        link.addEventListener("click", () => {
            links.forEach(l => {
                l.classList.remove("active");
            });

            link.classList.add("active");

            if (document.body.offsetWidth < 992) {
                document.getElementById("hamburger").click();
            }
        });
    });

    window.addEventListener("scroll", () => {
        let currentSection = "";
        let menu = ["about", "experience-nav", "projects-nav"];

        for (let option of menu) {
            if (isInViewport(document.getElementById(option))) {
                currentSection = option;
                break;
            }
        }

        links.forEach(link => {
            link.classList.remove("active");
        });

        if (currentSection) {
            const activeLink = document.querySelector(`[data-target="${currentSection}"]`);
            activeLink.classList.add("active");
        }
    });

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    /* SKILLS */
    fetch('./data/skills.json').then(response => response.json()).then(skills => {
        const skillsElement = document.getElementById("skills");

        skills.forEach(skill => {
            skillsElement.innerHTML += `<label>${skill}</label>`;
        });
    });

    /* EXPERIENCE */
    fetch('./data/experience.json').then(response => response.json()).then(experience => {
        const experienceElement = document.getElementById("experience");
        const experienceSize = experience.length;

        for (let i = 0; i < experienceSize; i++) {
            experienceElement.innerHTML += `
                <div class="card mb-3 bg-transparent" style="width: 18rem;">
                    <div class="card-header">${experience[i].entity}</div>
                    <div class="card-body">
                        <h5 class="card-title">${experience[i].title}</h5>
                        <h6 class="card-subtitle mb-3 fst-italic">${experience[i].period}</h6>
                        <p class="card-text">${experience[i].description}</p>
                    </div>
                    <div id="exp-skills-${i}" class="card-footer d-flex flex-wrap"></div>
                </div>
            `;

            const skillsElement = document.getElementById(`exp-skills-${i}`);
            const skillSize = experience[i].skills.length;

            for (let j = 0; j < skillSize; j++) {
                skillsElement.innerHTML += `<label>${experience[i].skills[j]}</label>`;
            }
        }
    });

    /* PROJECTS */
    fetch('./data/projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsElement = document.getElementById("projects");
            const projectSize = projects.length;

            for (let i = 0; i < projectSize; i++) {
                projectsElement.innerHTML += `
                    <a href="${projects[i].repository}" target="blank" class="col-md-4">
                        <div class="card mb-3 bg-transparent">
                            <img src="${projects[i].img}" class="card-img-top" alt="">
                            <div class="card-body">
                                <h5 class="card-title">${projects[i].name}</h5>
                                <p class="card-text">${projects[i].description}</p>
                            </div>
                            <div id="proj-skills-${i}" class="card-footer d-flex flex-wrap"></div>
                        </div>
                    </a>
                `;

                const skillsElement = document.getElementById(`proj-skills-${i}`);
                const skillSize = projects[i].skills.length;

                for (let j = 0; j < skillSize; j++) {
                    skillsElement.innerHTML += `<label>${projects[i].skills[j]}</label>`;
                }
            }
        });
});

document.addEventListener('DOMContentLoaded', function () {

});

function changeVisibilityMode() {
    const root = document.querySelector(":root");

    const darkMode = document.getElementById("dark-mode").checked;
    if (darkMode) {
        root.style.setProperty("--background-color", "#011C32");
        root.style.setProperty("--neutral-color", "#e0e0e0");
        root.style.setProperty("--accent-color", "#05D939");
        root.style.setProperty("--header-color", "#01223D");
        root.style.setProperty("--label-color", "#05D939");
    } else {
        root.style.setProperty("--background-color", "#f2f2f2");
        root.style.setProperty("--neutral-color", "#333333");
        root.style.setProperty("--accent-color", "#025834");
        root.style.setProperty("--header-color", "#025834");
        root.style.setProperty("--label-color", "white");
    }
}