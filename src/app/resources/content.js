import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Denis",
  lastName: "Kucevic",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Developer",
  avatar: "/images/avatar.png",
  location: "Europe/Belgrade", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Serbian"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the
      intersection of creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/DeniKucevic",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/denis-kucevic/",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:denikucevic@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Software developer and builder</>,
  subline: (
    <>
      I'm Denis, a software developer at <InlineCode>Advania</InlineCode>. After
      hours I build my own projects, create 3D models, 3D print, work on cars or
      work on some electronics project. I love to work with esp32 modules and
      arduinos.
      <br />
      <br /> This website is created as a place for me to write about my
      projects and hobbies. The blog part is currently under work.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Denis is a Belgrade-based software developer with a passion for
        transforming complex challenges into simple, elegant software solutions.
        His work spans web, mobile and backend. In free time he loves to work
        with electronics and cars.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Advania",
        timeframe: "2021 - Present",
        role: "Software specialist",
        achievements: [
          <>
            Worked in a team of highly skilled developers to create a cross
            platform mobile app from ground up
          </>,
          <>Learned about mobile development, native code and cross platform</>,
          <>Implemented native widgets for the app</>,
          <>
            Utilized Figma to implement complex designs and reusable components
          </>,
          <>Conducted code review processes</>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/companies/advania.png",
            alt: "Advania logo",
            width: 20,
            height: 9,
          },
        ],
      },
      {
        company: "Ölgerðin",
        timeframe: "2022 - Present",
        role: "Freelance - Android developer",
        achievements: [
          <>Maintaining existing code base and adding new features</>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/companies/olgerdin.png",
            alt: "Advania logo",
            width: 20,
            height: 9,
          },
        ],
      },
      {
        company: "Spark Analytics Ltd.",
        timeframe: "2021 - 2021",
        role: "Junior Full-stack Developer",
        achievements: [
          <>
            Worked on a full-stack application adding new features to both
            Vue.js frontend and node.js backend
          </>,
          <>Honed and improved on my Vue.js skills</>,
          <>Implemented full page translations integrating google translate</>,
          <>
            Improved my database and sql knowledge learning about migrations and
            how to use them
          </>,
        ],
        images: [
          {
            src: "/images/companies/spark-analytics.jpg",
            alt: "Spark analytics logo",
            width: 20,
            height: 9,
          },
        ],
      },
      {
        company: "Ana and Vlade Divac Foundation",
        timeframe: "2020 - 2021",
        role: "IT Technician",
        achievements: [
          <>Worked on websites adding new content and fixing issues</>,
          <>Got experience working with Vue.js</>,
          <>Learned how to use CMS systems</>,
          <>
            Done more work beside developing where I learned about CMS systems
            and supporting online seminars and meetings
          </>,
        ],
        images: [
          {
            src: "/images/companies/ana-vlade-divac.jpg",
            alt: "Ana and Vlade Divac logo",
            width: 20,
            height: 9,
          },
        ],
      },
      {
        company: "SVEA Ekonomi",
        timeframe: "2020 - 2020",
        role: " ",
        achievements: [
          <>
            Worked in a team of beginners to deliver a full-stack application to
            solve the issue of ordering food in workplace
          </>,
          <>
            Learned to work in teams, organize work boards and structure work
          </>,
          <>Learned to work with Kanban-style list-making applications</>,
        ],
        images: [
          {
            src: "/images/companies/svea.png",
            alt: "Svea logo",
            width: 20,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Jakarta",
        description: <>Studied software engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Frontend",
        description: (
          <>
            React, Vue, Material UI, Ionic, Bootstrap, Photon kit, sass, css,
            Mantine UI, Electron, Next.js
          </>
        ),
        images: [
          {
            src: "/images/technical-skill/react.png",
            alt: "React",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/vue.png",
            alt: "Vue",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/material.png",
            alt: "material UI",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/ionic.png",
            alt: "ionic",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/bootstrap.jpg",
            alt: "bootstrap",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/photon.png",
            alt: "photon kit",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/sass.png",
            alt: "sass",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/css.png",
            alt: "css",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/mantine.png",
            alt: "mantine ui",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/electron.png",
            alt: "electron js",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/next.png",
            alt: "next js",
            width: 6,
            height: 6,
          },
        ],
      },
      {
        title: "Backend",
        description: (
          <>Node.js, express, sqlite3, sql, mongoDB, postgresql, Supabase</>
        ),
        images: [
          {
            src: "/images/technical-skill/node.png",
            alt: "node",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/express.png",
            alt: "express js",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/sqlite.jpg",
            alt: "sqlite3",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/mongo.png",
            alt: "mongo db",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/postgresql.png",
            alt: "postgresql",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/supabase.png",
            alt: "supabase",
            width: 6,
            height: 6,
          },
        ],
      },
      {
        title: "Programming languages",
        description: (
          <>Javascript, Typescript, Java/kotlin, Swift, HTML, Arduino</>
        ),
        images: [
          {
            src: "/images/technical-skill/javascript.png",
            alt: "javascript",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/typescript.png",
            alt: "typescript",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/java.png",
            alt: "java",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/kotlin.jpg",
            alt: "kotlin",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/swift.jpg",
            alt: "swift",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/arduino.jpg",
            alt: "arduino",
            width: 6,
            height: 6,
          },
        ],
      },
      {
        title: "Tools",
        description: <>Figma, Fusion360, Canva, Jira</>,
        images: [
          {
            src: "/images/technical-skill/figma.png",
            alt: "figma",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/fusion.png",
            alt: "fusion360",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/canva.jpg",
            alt: "canva",
            width: 6,
            height: 6,
          },
          {
            src: "/images/technical-skill/jira.jpg",
            alt: "jira",
            width: 6,
            height: 6,
          },
        ],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/printer.jpeg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
