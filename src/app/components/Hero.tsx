"use client";

export default function Hero() {
  const profileDescription1 =
    "I'm a software engineer with a strong foundation in electronics, web development, and game programming. I love emerging technologies and how they can be applied to solve real-world problems.";
  const profileDescription2 =
    "Currently, I work as a programming instructor in C/C++, React, and Java. I'm also active as a full-stack developer, contributing to projects focused on building high-performance, cross-platform software.";

  return (
    <section className="mb-12">
      <header id="home" className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Nelson C.</h1>
        <h2 className="text-2xl text-gray-200 mt-2">
          Software Engineer & IT Instructor{" "}
        </h2>
      </header>

      <h2 className="text-2xl font-semibold mb-4">About me</h2>
      <p className="mb-4">{profileDescription1}</p>
      <p className="mb-4">{profileDescription2}</p>

      <div className="mt-6 text-blue-400 font-bold">
        <a
          href="#"
          className="inline-flex items-center text-blue-400 hover:underline font-medium"
        >
          Projects →
        </a>
      </div>
    </section>
  );
}
