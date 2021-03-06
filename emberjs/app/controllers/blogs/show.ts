import Controller from '@ember/controller';
import { inject as service, Registry as Services } from '@ember/service'

export default class BlogsShow extends Controller {
  @service session: Services["session"];
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'blogs/show': BlogsShow;
  }
}
