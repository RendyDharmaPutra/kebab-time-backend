import AppDataSource from './data-source';
import { OwnerSeeder } from './seeds/owner.seed';
import { RoleSeeder } from './seeds/role.seed';

async function runSeeds() {
  await AppDataSource.initialize();

  await new RoleSeeder().run(AppDataSource);
  await new OwnerSeeder().run(AppDataSource);

  await AppDataSource.destroy();
}

runSeeds();
