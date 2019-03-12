import { NgmaterialModule } from './ngmaterial.module';

describe('NgmaterialModule', () => {
  let ngmaterialModule: NgmaterialModule;

  beforeEach(() => {
    ngmaterialModule = new NgmaterialModule();
  });

  it('should create an instance', () => {
    expect(ngmaterialModule).toBeTruthy();
  });
});
