import { Injectable } from '@angular/core';
import {
  DefaultHttpUrlGenerator,
  HttpResourceUrls,
  Pluralizer,
} from '@ngrx/data';
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomurlHttpGenerator extends DefaultHttpUrlGenerator {
  constructor(pluralizer: Pluralizer) {
    super(pluralizer);
  }

  protected override getResourceUrls(
    entityName: string,
    _root: string,
    _trailingSlashEndpoints?: boolean | undefined
  ): HttpResourceUrls {
    let resourceURLs = this.knownHttpResourceUrls[entityName];

    let entityurl = '';
    if(entityName.toLowerCase() === 'questionnaire') {
      entityurl = 'questionnaires' 
    } else if (entityName.toLowerCase() === 'quizcategory') {
      entityurl = 'quizcategories'
    } else if (entityName.toLowerCase() === 'quiz') {
      entityurl = 'quizzes'
    }

    resourceURLs = {
      collectionResourceUrl: `${environment.baseurl}/${entityurl}`,
      entityResourceUrl: `${environment.baseurl}/${entityurl}`,
    };
    this.registerHttpResourceUrls({ [entityName]: resourceURLs });
    return resourceURLs;
  }
}
