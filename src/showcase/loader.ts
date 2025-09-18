import type BaseShowcase from './BaseShowcase';
import EmbedShowcase from './EmbedShowcase';
import ImageShowcase from './ImageShowcase';
import LinkShowcase from './LinkShowcase';
import ModelShowcase from './ModelShowcase';
import ScratchShowcase from './ScratchShowcase';
import ShowcaseMetadata from './ShowcaseMetadata';

let loadedShowcases: BaseShowcase[] = [];

export function getShowcases(): Promise<BaseShowcase[]> {
  return new Promise((resolve) => {
    if (loadedShowcases.length > 0) {
      resolve(loadedShowcases);
    }

    fetch('./showcase/showcase.json').then((response) =>
      response.text().then((text) => {
        const jsonArray: any[] = JSON.parse(text);
        let outputArray: BaseShowcase[] = [];
        jsonArray.forEach((obj) => {
          try {
            outputArray.push(parseShowcase(obj));
          } catch (e: any) {
            console.error(e);
          }
        });
        loadedShowcases = outputArray;
        resolve(outputArray);
      }),
    );
  });
}

export function parseShowcase(showcaseObj: any): BaseShowcase {
  const type: string = showcaseObj['type'];
  const metadata = parseMetadata(showcaseObj);
  switch (type) {
    case 'embed': {
      const src: string = showcaseObj['src']!;
      return new EmbedShowcase(src, metadata);
    }
    case 'image': {
      const imageSrc: string = showcaseObj['imageSrc'] ?? metadata.thumbnailSrc;
      return new ImageShowcase(imageSrc, metadata);
    }
    case 'model': {
      const modelSrc: string = showcaseObj['modelSrc'] ?? './showcase/default_model.glb';
      const clearColor: number = Number.parseInt(showcaseObj['clearColor'], 16) ?? 0x444444;
      return new ModelShowcase(modelSrc, clearColor, metadata);
    }
    case 'scratch': {
      const projectId: number = showcaseObj['projectId'];
      const turbowarp: boolean = showcaseObj['turbowarp'] ?? false;
      return new ScratchShowcase(projectId, turbowarp, metadata);
    }
    case 'link': {
      const href: string = showcaseObj['href'];
      return new LinkShowcase(href, metadata);
    }
  }
  throw new TypeError('Invalid showcase type!');
}

function parseMetadata(showcaseObj: any): ShowcaseMetadata {
  const name: string = showcaseObj['name'] ?? '無名の作品';
  const icon: string = showcaseObj['icon'] ?? 'media';
  const thumbnailSrc: string = showcaseObj['thumbnailSrc'] ?? './showcase/default_thumbnail.webp';
  const downloadUrl: string = showcaseObj['downloadUrl'] ?? '';
  return new ShowcaseMetadata(name, icon, thumbnailSrc, downloadUrl);
}

export default function getMaterialSymbolIcon(icon: string) {
  switch (icon) {
    case 'media':
      return 'image';
    case 'model':
      return 'deployed_code';
    case 'game':
      return 'stadia_controller';
    default:
      return icon;
  }
}
