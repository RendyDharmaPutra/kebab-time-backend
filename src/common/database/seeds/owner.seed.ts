import { Auth } from 'src/auths/auth.entity';
import { PasswordService } from 'src/common/services/password.service';
import { RoleName } from 'src/roles/role-enum';
import { Role } from 'src/roles/role.entity';
import { Staff } from 'src/staffs/staff.entity';
import { DataSource } from 'typeorm';

export class OwnerSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const staffRepo = dataSource.getRepository(Staff);
    const authRepo = dataSource.getRepository(Auth);
    const roleRepo = dataSource.getRepository(Role);

    try {
      const isOwnerExist = await authRepo.exists({
        where: { role: { name: RoleName.OWNER } },
      });
      if (isOwnerExist) {
        console.info('Owner already exist');
        return;
      }

      const passwordService = new PasswordService();

      const ownerRole = await roleRepo.findOne({
        where: { name: RoleName.OWNER },
      });

      const ownerCredential = {
        email: process.env.OWNER_EMAIL!,
        password: await passwordService.hash(process.env.OWNER_PASSWORD!),
        role: ownerRole,
      };
      const ownerProfile = {
        fullname: 'Owner Kebab Time',
        address: 'Jember, Indonesia',
        phone: process.env.OWNER_PHONE!,
      };

      const authResult = await authRepo.save(ownerCredential);
      await staffRepo.save({ ...ownerProfile, auth: authResult });

      console.info('Success Add Owner');
    } catch (error) {
      console.log(error);
    }
  }
}
