
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const password = await hash('password123', 12)
    const user = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password,
            role: 'ADMIN',
            posts: {
                create: {
                    title: 'Welcome to the Lab',
                    slug: 'welcome',
                    content: '<p>This is where I break things to build them better. Welcome to my digital playground.</p>',
                    published: true,
                    excerpt: 'The beginning of something chaotic.',
                },
            },
        },
    })

    const profileCount = await prisma.profile.count();
    if (profileCount === 0) {
        await prisma.profile.create({
            data: {
                name: 'Shruti',
                bio: 'Full-stack developer with a passion for digital chaos and order.',
                avatarUrl: '/uploads/avatar-placeholder.png',
                twitter: 'https://twitter.com/shruti',
                github: 'https://github.com/shruti',
            }
        });
    }

    const projectCount = await prisma.project.count();
    if (projectCount === 0) {
        await prisma.project.create({
            data: {
                title: 'Project Chaos',
                slug: 'project-chaos',
                description: 'A system to manage entropy in digital workspaces.',
                content: '<p>Full rich text description of Project Chaos.</p>',
                liveUrl: 'https://example.com',
                techStack: 'Next.js, Prisma, Entropy',
                published: true,
            }
        })
    }
    console.log({ user })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
