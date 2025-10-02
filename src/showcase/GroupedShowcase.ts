import BaseShowcase from './BaseShowcase';
import type ShowcaseMetadata from './ShowcaseMetadata';

export default class GroupedShowcase extends BaseShowcase {
  constructor(
    public children: BaseShowcase[],
    metadata: ShowcaseMetadata,
  ) {
    super('grouped', metadata);
  }

  public getComponent(): () => any {
    return () => undefined;
  }
}
