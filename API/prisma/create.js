const prisma = require("../src/app/db");
const { logger } = require("../src/app/logging");
const bcrypt = require("bcrypt");

async function main() {
    const args = process.argv;
    const table = args.slice(2)[0];

    switch (table.toUpperCase()) {
        case "ROLE":
            logger.info(" [i]: CREATING ROLE");
            const roleName = args.slice(2)[1];
            try {
                await prisma.role.create({
                    data: {
                        name: roleName,
                    },
                });
                logger.info(` [i]: Success create data`);
            } catch (error) {
                logger.error(` [x]: Failed to create data ${error}`);
            }
            break;

        case "SUPERADMIN":
            logger.info(" [i]: CREATING SUPER ADMIN");
            const username = args.slice(2)[1];
            const email = args.slice(2)[2];
            const password = await bcrypt.hash(args.slice(2)[3], 10);
            try {
                await prisma.user.create({
                    data: {
                        username,
                        email,
                        emailIsVerified: true,
                        password: password,
                        accountIsVerified: true,
                        passwordUpdatedAt: new Date(Date.now() - 1000),
                        role: {
                            connect: {
                                name: "SUPER ADMIN",
                            },
                        },
                    },
                });
                logger.info(` [i]: Success create data`);
            } catch (error) {
                logger.error(` [x]: Failed to create data ${error}`);
            }
            break;

        default:
            logger.warn("COMMAND NOT FOUND");
            break;
    }
}

main()
    .catch((e) => {
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
