import { Resource } from '@ab/data';
import { SeoService } from '@ab/global';
import { Header } from '@ab/ui';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GhRepo } from './models/gh-repo';
import { NpmRegistry } from './models/npm-registry';
import { ResourceService } from './resource.service';
@Component({
  templateUrl: './resource.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcePage implements OnInit {
  private header = {
    heroClass: 'is-primary',
    title: 'Category',
    subtitle: 'loading...',
  };

  header$ = new BehaviorSubject<Header>(this.header);
  resource$!: Observable<Resource>;
  ghRepo$!: Observable<GhRepo>;
  npmRegistry$!: Observable<NpmRegistry>;
  noCode$!: Observable<Resource>;
  constructor(
    private route: ActivatedRoute,
    private service: ResourceService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    const resourceId = this.route.snapshot.params.id;
    this.header$.next({ ...this.header, title: resourceId });
    this.resource$ = this.service.getResourceById$(resourceId).pipe(
      tap((resource) => {
        this.header$.next({
          ...this.header,
          title: resource.name,
          subtitle: resource.description,
        });
        this.seo.updateSeoTags({
          title: resource.name,
          description: resource.description,
          image: '',
          url: '',
        });
        if (resource.url.startsWith('https://github.com/')) {
          this.ghRepo$ = this.service.getGitHubRepoByRepoUrl(resource.url);
          this.npmRegistry$ = this.service.getNpmRegisitryByName(resource.name);
        } else {
          this.noCode$ = of(resource);
        }
      })
    );
  }
}
