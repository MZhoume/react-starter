import { Container } from 'inversify';
import { StorageService } from './services/storage.service';
import { DataService } from './services/data.service';

export async function getContainer(): Promise<Container> {
  const dataService = new DataService();
  await dataService.init();

  const container = new Container();
  container.bind(DataService).toConstantValue(dataService);
  container
    .bind(StorageService)
    .to(StorageService)
    .inSingletonScope();

  return container;
}
