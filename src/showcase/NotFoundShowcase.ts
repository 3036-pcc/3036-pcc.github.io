import BaseShowcase from './BaseShowcase';
import ShowcaseMetadata from './ShowcaseMetadata';

class NotFoundShowcase extends BaseShowcase {
  constructor() {
    super('not_found', new ShowcaseMetadata('Error', '', './default_thumbnail.webp', ''));
  }

  public getComponent() {
    return () => import('./NotFoundShowcaseComp.vue');
  }
}

export default new NotFoundShowcase();
