import Image from "next/image";

export default function TailwindPractice() {
  return (
    <div className="bg-slate-900 min-h-screen w-full overflow-x-hidden">
      <header className="max-w-5xl mx-auto py-8 px-5 ">
        <nav>
          <ul className="uppercase tracking-wide flex flex-wrap gap-4 text-sm justify-center sm:justify-between">
            <li className="sm:mr-auto">
              <a
                href="#"
                className="hover:bg-fuchsia-700 transition-colors p-1 rounded-md "
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:bg-fuchsia-700 transition-colors p-1 rounded-md "
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:bg-fuchsia-700 transition-colors p-1 rounded-md "
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:bg-fuchsia-700 transition-colors p-1 rounded-md "
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <section className="grid gap-6 lg:grid-cols-2 items-center text-center max-w-3xl lg:max-w-5xl mx-auto px-5 py-12">
        <Image
          src="/bg-image.jpg"
          alt="bg-image"
          className="w-full h-auto rounded-lg lg:order-2"
          height={2400}
          width={1602}
        />

        <div className="space-y-5">
          <h1 className="text-4xl font-extrabold">
            Tailwind Hyper Class Website
          </h1>
          <p className="text-[1.2rem]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo
            pariatur, delectus sequi voluptatem eos natus mollitia architecto ex
            eius dicta quis dolor magni ea laboriosam deserunt alias repudiandae
            aliquid error!
          </p>
          <a
            href="#"
            className="inline-block bg-fuchsia-800 px-6 py-2 rounded-full hover:bg-fuchsia-600"
          >
            Click Me
          </a>
        </div>
      </section>
      <section className="max-w-3xl lg:max-w-5xl mx-auto px-5 py-12 grid gap-5 grid-cols-auto sm:grid-cols-3 lg:grid-cols-4   ">
        <h2 className="text-3xl font-bold text-center col-span-full mb-5">
          Resources
        </h2>
        <div className="bg-blue-900 space-y-2 p-3 rounded-md bg-linear-to-tl from-blue-900 to-fuchsia-900">
          <h3 className="text-lg font-bold">Images Drive</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, quidem?
          </p>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-fuchsia-400 hover:text-white transition-colors "
          >
            Read More
          </a>
        </div>
        <div className="bg-blue-900 space-y-2 p-3 rounded-md bg-linear-to-tl from-blue-900 to-fuchsia-900">
          <h3 className="text-lg font-bold">Images Drive</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, quidem?
          </p>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-fuchsia-400 hover:text-white transition-colors "
          >
            Read More
          </a>
        </div>{" "}
        <div className="bg-blue-900 space-y-2 p-3 rounded-md bg-linear-to-tl from-blue-900 to-fuchsia-900">
          <h3 className="text-lg font-bold">Images Drive</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, quidem?
          </p>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-fuchsia-400 hover:text-white transition-colors "
          >
            Read More
          </a>
        </div>{" "}
        <div className="bg-blue-900 space-y-2 p-3 rounded-md bg-linear-to-tl from-blue-900 to-fuchsia-900">
          <h3 className="text-lg font-bold">Images Drive</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, quidem?
          </p>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-fuchsia-400 hover:text-white transition-colors "
          >
            Read More
          </a>
        </div>{" "}
        <div className="bg-blue-900 space-y-2 p-3 rounded-md bg-linear-to-tl from-blue-900 to-fuchsia-900">
          <h3 className="text-lg font-bold">Images Drive</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, quidem?
          </p>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-fuchsia-400 hover:text-white transition-colors "
          >
            Read More
          </a>
        </div>{" "}
        <div className="bg-blue-900 space-y-2 p-3 rounded-md bg-linear-to-tl from-blue-900 to-fuchsia-900">
          <h3 className="text-lg font-bold">Images Drive</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, quidem?
          </p>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-fuchsia-400 hover:text-white transition-colors "
          >
            Read More
          </a>
        </div>{" "}
        <div className="bg-blue-900 space-y-2 p-3 rounded-md bg-linear-to-tl from-blue-900 to-fuchsia-900">
          <h3 className="text-lg font-bold">Images Drive</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, quidem?
          </p>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-fuchsia-400 hover:text-white transition-colors "
          >
            Read More
          </a>
        </div>{" "}
        <div className="bg-blue-900 space-y-2 p-3 rounded-md bg-linear-to-tl from-blue-900 to-fuchsia-900">
          <h3 className="text-lg font-bold">Images Drive</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, quidem?
          </p>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-fuchsia-400 hover:text-white transition-colors "
          >
            Read More
          </a>
        </div>{" "}
        <div className="bg-blue-900 space-y-2 p-3 rounded-md bg-linear-to-tl from-blue-900 to-fuchsia-900">
          <h3 className="text-lg font-bold">Images Drive</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, quidem?
          </p>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-fuchsia-400 hover:text-white transition-colors "
          >
            Read More
          </a>
        </div>
      </section>
    </div>
  );
}
