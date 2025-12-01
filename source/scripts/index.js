import { initMenu } from './modules/burger-menu';
import { renderProjects } from './modules/projects-render';

window.addEventListener('DOMContentLoaded', () => {
  initMenu();
  renderProjects();
});
