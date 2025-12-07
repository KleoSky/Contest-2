import { initMenu } from './modules/burger-menu';
import { initProjectsReorganizer } from './modules/projects-reorganizer';
import { initTransform } from './modules/init';

window.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initProjectsReorganizer();
  initTransform();
});
