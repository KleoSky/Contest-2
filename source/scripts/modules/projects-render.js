import { projectsData } from "../data/projects-data";

const createPicture = (imageName, alt, desktopSize, tabletSize, mobileSize) => {
  return `
  <picture>
      <source media="(min-width: 1440px)" width="${desktopSize.width}" height="${desktopSize.height}"
              type="image/webp" srcset="images/${imageName}@1x.webp 1x, images/${imageName}@2x.webp 2x">
      <source media="(min-width: 768px)" width="${tabletSize.width}" height="${tabletSize.height}"
              type="image/webp" srcset="images/${imageName}@1x.webp 1x, images/${imageName}@2x.webp 2x">
      <source width="${mobileSize.width}" height="${mobileSize.height}"
              type="image/webp" srcset="images/${imageName}@1x.webp 1x, images/${imageName}@2x.webp 2x">

      <source media="(min-width: 1440px)" width="${desktopSize.width}" height="${desktopSize.height}"
              type="image/png" srcset="images/${imageName}@1x.png 1x, images/${imageName}@2x.png 2x">
      <source media="(min-width: 768px)" width="${tabletSize.width}" height="${tabletSize.height}"
              type="image/png" srcset="images/${imageName}@1x.png 1x, images/${imageName}@2x.png 2x">

      <img src="images/${imageName}@1x.png"
           srcset="images/${imageName}@2x.png 2x"
           width="${mobileSize.width}"
           height="${mobileSize.height}"
           alt="${alt}">
    </picture>
  `;
};

const createProjectCard = (project) => {
  return `
  <li class="projects__gallery-slide">
      <a class="projects__gallery-link" href="${project.link}">
        <h4 class="projects__gallery-slide-title">${project.title}</h3>
        <p class="projects__gallery-text">${project.description}</p>
        <div class="projects__gallery-image">
          ${createPicture(
            project.image.name,
            project.image.alt,
            project.image.desktop,
            project.image.tablet,
            project.image.mobile
          )}
        </div>
      </a>
    </li>
  `;
};

export const renderProjects = () => {
  const containers = {
    companies: document.querySelector('.projects__gallery-slider--companies'),
    developers: document.querySelector('.projects__gallery-slider--developers'),
    b2c: document.querySelector('.projects__gallery-slider--b2c')
  };

  Object.keys(containers).forEach(category => {
    const container = containers[category];
    if (!container) return;

    const categoryData = projectsData[category];
    if (!categoryData) return;

    const cardsHTML = categoryData.map(project =>
      createProjectCard(project)
    ).join('');

    container.innerHTML = cardsHTML;
  });
}
