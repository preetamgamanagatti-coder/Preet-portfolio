
// ======================================
// LOAD PORTFOLIO DATA USING FETCH API
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const loadingMessage = document.getElementById("loadingMessage");
    const portfolioContent = document.getElementById("portfolioContent");

    async function loadPortfolio() {

        try {

            const response = await fetch("data.json");

            if (!response.ok) {
                throw new Error("Unable to load portfolio data.");
            }

            const data = await response.json();

            // Render all portfolio sections
            displayPersonalDetails(data.personal);
            displayAbout(data.about);
            displaySkills(data.skills);
            displayProjects(data.projects);
            displayEducation(data.education);
            displayCertifications(data.certifications);
            displaySocialLinks(data.social);

            // Display website
            loadingMessage.style.display = "none";
            portfolioContent.style.display = "block";

            document.getElementById("currentYear").textContent =
                new Date().getFullYear();

        } catch (error) {

            console.error(error);

            loadingMessage.innerHTML = `
                <div class="container">
                    <h3 class="text-danger">Oops! Something went wrong.</h3>
                    <p>Unable to load portfolio data.</p>
                    <p>Please check your data.json file and run the project using a local server.</p>
                </div>
            `;
        }
    }


    // ======================================
    // PERSONAL DETAILS
    // ======================================

    function displayPersonalDetails(personal) {

        document.getElementById("studentName").textContent = personal.name;

        document.getElementById("studentRole").textContent = personal.role;

        document.getElementById("studentIntro").textContent =
            personal.introduction;

        document.getElementById("careerGoal").textContent =
            personal.careerGoal;

        document.getElementById("profileImage").src =
            personal.profileImage;

        document.getElementById("aboutImage").src =
            personal.profileImage;

        document.getElementById("studentEmail").textContent =
            personal.email;

        document.getElementById("studentPhone").textContent =
            personal.phone;

        document.getElementById("studentLocation").textContent =
            personal.location;

        document.getElementById("resumeLink").href =
            personal.resume;

        document.getElementById("footerName").textContent =
            personal.name;

        document.getElementById("copyrightName").textContent =
            personal.name;
    }


    // ======================================
    // ABOUT SECTION
    // ======================================

    function displayAbout(about) {

        document.getElementById("aboutTitle").textContent =
            about.title;

        document.getElementById("aboutDescription").textContent =
            about.description;
    }


    // ======================================
    // SKILLS SECTION
    // ======================================

    function displaySkills(skills) {

        const container = document.getElementById("skillsContainer");

        container.innerHTML = "";

        skills.forEach(skill => {

            const card = document.createElement("div");

            card.className = "col-sm-6 col-lg-4";

            card.innerHTML = `
                <div class="skill-card">

                    <i class="bi ${skill.icon} skill-icon"></i>

                    <h4>${skill.name}</h4>

                    <p>${skill.description}</p>

                    <div class="skill-level">
                        <div class="skill-progress"
                            style="width: ${skill.level}%">
                        </div>
                    </div>

                    <small class="text-secondary">
                        ${skill.level}% Learning Progress
                    </small>

                </div>
            `;

            container.appendChild(card);
        });
    }


    // ======================================
    // PROJECTS SECTION
    // ======================================

    function displayProjects(projects) {

        const container = document.getElementById("projectsContainer");

        container.innerHTML = "";

        projects.forEach(project => {

            const tags = project.technologies.map(tech =>
                `<span>${tech}</span>`
            ).join("");

            const card = document.createElement("div");

            card.className = "col-md-6 col-lg-6";

            card.innerHTML = `
                <div class="project-card">

                    <div class="project-image-wrapper">
                        <img src="${project.image}"
                            alt="${project.name}"
                            class="project-img">
                    </div>

                    <div class="project-info">

                        <h4>${project.name}</h4>

                        <p>${project.description}</p>

                        <div class="project-tags">
                            ${tags}
                        </div>

                        <a href="${project.link}"
                            class="project-link"
                            target="_blank"
                            rel="noopener noreferrer">

                            View Project
                            <i class="bi bi-arrow-up-right"></i>

                        </a>

                    </div>
                </div>
            `;

            container.appendChild(card);
        });
    }


    // ======================================
    // EDUCATION SECTION
    // ======================================

    function displayEducation(education) {

        const container = document.getElementById("educationContainer");

        container.innerHTML = "";

        education.forEach(item => {

            const card = document.createElement("div");

            card.className = "education-card";

            card.innerHTML = `
                <h4>
                    <i class="bi bi-mortarboard-fill me-2"></i>
                    ${item.course}
                </h4>

                <h6>${item.college}</h6>

                <p>${item.semester} | ${item.duration}</p>

                <p>${item.details}</p>

                <strong class="text-info">${item.result}</strong>
            `;

            container.appendChild(card);
        });
    }


    // ======================================
    // CERTIFICATIONS SECTION
    // ======================================

    function displayCertifications(certifications) {

        const container = document.getElementById("certificationsContainer");

        container.innerHTML = "";

        certifications.forEach(cert => {

            const card = document.createElement("div");

            card.className = "col-md-6 col-lg-4";

            card.innerHTML = `
                <div class="certification-card">

                    <i class="bi bi-patch-check-fill"></i>

                    <h5>${cert.name}</h5>

                    <p>${cert.organization}</p>

                    <small class="text-info">
                        ${cert.year}
                    </small>

                </div>
            `;

            container.appendChild(card);
        });
    }


    // ======================================
    // SOCIAL MEDIA LINKS
    // ======================================

    function displaySocialLinks(social) {

        const container = document.getElementById("socialLinks");

        container.innerHTML = "";

        social.forEach(item => {

            const link = document.createElement("a");

            link.href = item.url;

            link.target = "_blank";

            link.rel = "noopener noreferrer";

            link.title = item.name;

            link.innerHTML = `<i class="${item.icon}"></i>`;

            container.appendChild(link);
        });
    }


    // ======================================
    // CONTACT FORM VALIDATION
    // ======================================

    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();

        const email = document.getElementById("contactEmail").value.trim();

        const subject = document.getElementById("contactSubject").value.trim();

        const message = document.getElementById("contactMessage").value.trim();

        const formMessage = document.getElementById("formMessage");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !subject || !message) {

            showMessage("Please fill in all fields.", "danger");

            return;
        }

        if (!emailPattern.test(email)) {

            showMessage("Please enter a valid email address.", "danger");

            return;
        }

        if (name.length > 100 || subject.length > 150 || message.length > 3000) {

            showMessage("Please shorten your input and try again.", "danger");

            return;
        }

        showMessage(
            "Your form is valid! Connect a backend or email service to send your message.",
            "success"
        );

        contactForm.reset();

    });


    function showMessage(message, type) {

        const formMessage = document.getElementById("formMessage");

        formMessage.className = `mt-3 alert alert-${type}`;

        formMessage.textContent = message;
    }


    // ======================================
    // START WEBSITE
    // ======================================

    loadPortfolio();

});
