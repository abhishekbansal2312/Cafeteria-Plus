import React from "react";
import { motion } from "framer-motion";
import HomeImg from "../../public/image.png";
export default function PageNotFound({ theme }) {
  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-black"
      } min-h-screen pb-20 transition-all`}
    >
      <div className="flex min-h-screen items-center justify-center px-6">
        <section className="home flex flex-col items-center justify-center text-center">
          <div className="home__container grid w-full max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
            <div className="home__data flex flex-col items-center lg:items-start">
              <p className="pb-2 text-lg font-semibold  sm:text-xl">
                Error 404
              </p>
              <h1 className="pb-4 text-4xl font-bold  sm:text-5xl md:text-6xl">
                Hey Buddy
              </h1>
              <p className="pb-8 text-base font-medium  sm:text-lg">
                We can't seem to find the page{" "}
                <br className="hidden sm:block" />
                you are looking for.
              </p>
              <a
                href="/"
                className="inline-flex border-2 items-center justify-center rounded-full  py-3 px-6 font-bold transition duration-300   sm:py-4 sm:px-8 sm:text-lg"
              >
                Go Home
              </a>
            </div>

            <motion.div
              className="home__img mx-auto flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.img
                src={HomeImg}
                className="w-56 sm:w-64 md:w-80 lg:w-[400px]"
                alt="home image"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="home__shadow mx-auto mt-4 h-6 w-28 rounded-[50%] bg-gray-900/30 dark:bg-gray-600/30 blur-md sm:h-8 sm:w-36 md:w-48 lg:w-64"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>

          <div className="home__footer mt-10 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-gray-700 dark:text-gray-400 sm:text-base">
            <p>DineSync</p>
            <p className="hidden sm:block">|</p>
            <p>Seamless Dining</p>
          </div>
        </section>
      </div>
    </div>
  );
}
