import BaseShowcase from './BaseShowcase';
import type ShowcaseMetadata from './ShowcaseMetadata';

export default class ModelShowcase extends BaseShowcase {
  constructor(
    public modelSrc: string,
    public clearColor: number,
    metadata: ShowcaseMetadata,
  ) {
    super('model', metadata);
  }

  public getComponent() {
    return () => import('./ModelShowcaseComp.vue');
  }
}
