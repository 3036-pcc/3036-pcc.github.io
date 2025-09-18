import BaseShowcase from './BaseShowcase';
import type ShowcaseMetadata from './ShowcaseMetadata';

export default class ImageShowcase extends BaseShowcase {
  constructor(
    public imageSrc: string,
    metadata: ShowcaseMetadata,
  ) {
    super('image', metadata);
  }

  public getComponent() {
    return () => import('./ImageShowcaseComp.vue');
  }
}
