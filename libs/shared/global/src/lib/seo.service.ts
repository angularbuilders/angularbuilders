import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  url: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}
  initialize() {
    this.meta.addTags([
      { name: 'date', content: new Date().toISOString().slice(0, 10), scheme: 'YYYY-MM-DD' },
    ]);
  }
  updateSeoTags(seoData: SeoData) {
    this.updateTitle(seoData.title);
    this.updateTag('image', seoData.image);
    this.updateTag('description', seoData.description);
    this.updateTag('url', seoData.url);
  }

  private updateTitle(title: string) {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ property: 'og:title', content: title });
  }

  private updateTag(tag: string, content: string) {
    // if (!content) return;
    this.meta.updateTag({ name: tag, content: content });
    this.meta.updateTag({ name: 'twitter:' + tag, content: content });
    this.meta.updateTag({ property: 'og:' + tag, content: content });
  }
}
