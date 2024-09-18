// app/about/page.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Wave from "react-wavify";
import { TbCode, TbBrain, TbRocket } from "react-icons/tb";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-700 pt-20">
      <div className="absolute inset-0 z-0 overflow-hidden h-full w-full bottom-0 flex justify-center items-end">
        <Wave
          fill="#111827"
          paused={false}
          style={{ display: "flex", height: "65%" }}
          options={{
            height: 40,
            amplitude: 40,
            speed: 0.15,
            points: 4,
          }}
        />
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-4 py-16 text-white"
      >
        <motion.section
          variants={itemVariants}
          className="flex flex-col items-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-8">About Me</h1>
          <div className="relative">
            <Image
              src="/BrandonPeterson.webp"
              alt="Brandon Peterson"
              width={250}
              height={250}
              className="rounded-full border-4 border-white shadow-lg"
            />
            <Link href="https://github.com/petersonBrandon" target="_blank">
              <motion.div
                className="absolute -bottom-4 -right-4 bg-blue-500 rounded-full p-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <TbCode size={30} />
              </motion.div>
            </Link>
          </div>
        </motion.section>

        <motion.section
          variants={itemVariants}
          className="mb-16 grid md:grid-cols-2 gap-8"
        >
          <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <TbBrain className="mr-2" /> Passion & Expertise
            </h2>
            <p className="text-lg">
              As a passionate software engineer and lifelong learner, I
              specialize in crafting seamless user experiences through rigorous
              testing, process optimization, and comprehensive full-stack web
              development. Currently, I work as a senior software automation
              test engineer contractor at{" "}
              <Link
                href="https://www.digitaldreamforge.com/"
                target="_blank"
                className="border-b-2 border-blue-300 hover:text-blue-300 transition duration-300"
              >
                Digital Dream Forge
              </Link>
              , ensuring product integrity for{" "}
              <Link
                href="https://www.masterclass.com/"
                target="_blank"
                className="border-b-2 border-blue-300 hover:text-blue-300 transition duration-300"
              >
                MasterClass
              </Link>{" "}
              through automated testing.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <TbRocket className="mr-2" /> Education & Growth
            </h2>
            <p className="text-lg">
              {`I hold a Bachelor\'s degree in Software Engineering from `}
              <Link
                href="https://www.byui.edu/"
                target="_blank"
                className="border-b-2 border-blue-300 hover:text-blue-300 transition duration-300"
              >
                Brigham Young University - Idaho
              </Link>
              {`. My journey doesn\'t
              stop there - I\'m constantly learning new tools and skills, from
              mastering algorithm patterns to exploring new languages and
              creating small projects.`}
            </p>
          </div>
        </motion.section>

        {/* <motion.section variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Beyond the Code
          </h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
            <p className="text-xl mb-4">
              When I'm not crafting code, I'm sharing my insights and
              experiences on my{" "}
              <Link
                href="https://blog.brandonpeterson.dev/"
                target="_blank"
                className="border-b-2 border-blue-300 hover:text-blue-300 transition duration-300"
              >
                Blog
              </Link>
              . It's where I explore various technologies and document my
              learning journey.
            </p>
            <p className="text-xl">
              Curious about what I'm building? Check out my current projects{" "}
              <Link
                href="/projects"
                className="border-b-2 border-blue-300 hover:text-blue-300 transition duration-300"
              >
                here
              </Link>
              , or explore my{" "}
              <Link
                href="https://github.com/petersonBrandon"
                target="_blank"
                className="border-b-2 border-blue-300 hover:text-blue-300 transition duration-300"
              >
                GitHub profile
              </Link>{" "}
              for a deeper dive into my code.
            </p>
          </div>
        </motion.section> */}
      </motion.main>
    </div>
  );
};

export default About;
