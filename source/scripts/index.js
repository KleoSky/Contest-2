import { initMenu } from './modules/burger-menu';
import { initProjectsReorganizer } from './modules/projects-reorganizer';

window.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initProjectsReorganizer();
});
