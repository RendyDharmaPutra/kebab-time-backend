import { Role } from 'src/roles/role.entity';
import { DataSource } from 'typeorm';

export class RoleSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(Role);

    const count = await repository.count();

    if (count > 0) {
      return;
    }

    await repository.insert([
      { name: 'Owner' },
      { name: 'Staff' },
      { name: 'Supplier' },
      { name: 'Customer' },
    ]);
  }
}
