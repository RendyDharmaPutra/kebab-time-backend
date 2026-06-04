import AppDataSource from './data-source';
import { RoleSeeder } from './seeds/role.seed';

async function runSeeds() {
  await AppDataSource.initialize();

  await new RoleSeeder().run(AppDataSource);

  await AppDataSource.destroy();
}

runSeeds();
