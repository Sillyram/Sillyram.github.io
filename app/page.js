import Countdown from "@/components/countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">
              <div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <img src="icon.png"></img>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    className="font-semibold text-4xl text-gray-900"
                    id="modal-title"
                  >
                    Welcome to Lumiacraft!
                  </h3>
                  <div className="mt-2">
                    <Countdown />
                  </div>
                </div>
                <div className="pt-8">
                  <p className="text-gray-900 text-xl">
                    In the meantime, here&apos;s some nostalgia from some of our
                    really old members. We miss you :3
                  </p>
                  <ul className="pt-8">
                    <li>
                      <Link href="https://www.youtube.com/watch?v=3avg-FndwG8">
                        <span className="text-blurple text-xl">
                          Lumiacraft: My Own Kingdom - Work in Progress
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.youtube.com/watch?v=MJnIuoiN5fY">
                        <span className="text-blurple text-xl">
                          LumiaCraft Harlem SHAKE!!
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.youtube.com/watch?v=p2TXnAGqmns">
                        <span className="text-blurple text-xl">
                          Minecraft Timelapse: [Market] [Lumiacraft] (HD)
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
