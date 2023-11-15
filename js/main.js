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
        if (document.body.offsetWidth >= 992) {
            let currentSection = "";
            let menu = ["about", "experience-nav", "projects-nav", "mystory-nav", "content-nav"];

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
            skillsElement.innerHTML += `<span class="tag">${skill}</span>`;
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
                skillsElement.innerHTML += `<span class="tag">${experience[i].skills[j]}</span>`;
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
                    skillsElement.innerHTML += `<span class="tag">${projects[i].skills[j]}</span>`;
                }
            }
        });

    /* DIGITAL CONTENT  */
    fetch('./data/videos.json').then(response => response.json()).then(videos => {
        const videosElement = document.getElementById("videos");

        videos.forEach(video => {
            videosElement.innerHTML += `
            <div class="modal fade" id="${video.name}">
                <div class="modal-dialog modal-dialog-centered" style="max-width: 350px; margin:auto">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5"> <a href="https://tiktok.com/@luisanhello" rel="nofollow"
                                    target="_blank">@luisanhello</a></h1>
                            <a target="_blank" class="btn btn-primary ms-auto" href="https://tiktok.com/@luisanhello" rel="nofollow">Ver perfil</a>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body d-flex justify-content-center">
                            <blockquote class="tiktok-embed"
                                cite="https://www.tiktok.com/@luisanhello/video/${video.id}"
                                data-video-id="${video.id}">
                                <section> <a target="_blank" title="@luisanhello"
                                        href="https://www.tiktok.com/@luisanhello?refer=embed">@luisanhello</a></section>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });

        const script = document.createElement("script");
        script.src = "https://www.tiktok.com/embed.js";
        document.head.appendChild(script);
    });
});

function changeVisibilityMode() {
    const root = document.querySelector(":root");
    let closeButtons = document.getElementsByClassName("btn-close");

    const darkMode = document.getElementById("dark-mode").checked;
    if (darkMode) {
        root.style.setProperty("--background-color", "#011C32");
        root.style.setProperty("--neutral-color", "#e0e0e0");
        root.style.setProperty("--accent-color", "#05D939");
        root.style.setProperty("--header-color", "#01223D");
        root.style.setProperty("--label-color", "#05D939");
        root.style.setProperty("--modal-color", "#212529");
        Array.from(closeButtons).forEach(btn => {
            btn.classList.add("btn-close-white");
        });
    } else {
        root.style.setProperty("--background-color", "#f2f2f2");
        root.style.setProperty("--neutral-color", "#333333");
        root.style.setProperty("--accent-color", "#025834");
        root.style.setProperty("--header-color", "#025834");
        root.style.setProperty("--label-color", "white");
        root.style.setProperty("--modal-color", "#ffffff");

        Array.from(closeButtons).forEach(btn => {
            btn.classList.remove("btn-close-white");
        });
    }
}