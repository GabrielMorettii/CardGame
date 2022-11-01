import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

(async function prismaSeed() {
    try {
      await prisma.$queryRaw`INSERT INTO public.users (id,email,name,password, role,dt_update,dt_inactivated) VALUES
        ('7e8a6a15-5bfd-45de-aec7-a19a4ebef442','gabrielmorettipb5@gmail.com','gabrielmorettidev','$argon2id$v=19$m=65536,t=3,p=4$S9zJ7aZYuvUR8CfILZzfUQ$3UK11Fi+x77vYiq7Kms86OPMDZlW8RbwVrerssTeFgU', 'admin', '2022-11-01 12:13:01.245',NULL) ON CONFLICT DO NOTHING;`;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

    await prisma.$disconnect();
})();
