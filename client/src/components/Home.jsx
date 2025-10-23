import {
  AdjustmentsHorizontalIcon,
  ArrowUpOnSquareIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/solid";
import { Button } from "./ui/button";
import Header from "./Header";
import { Signup } from "./Signup";
import { useState } from "react";
import { Signin } from "./Signin";

const Home = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSigninOpen, setIsSigninOpen] = useState(false);

  const toggleSignup = () => {
    setIsSignupOpen((prev) => !prev);
  };

  const toggleSignin = () => {
    setIsSigninOpen((prev) => !prev);
  };

  const cardItems = [
    {
      id: 1,
      icon: ArrowUpOnSquareIcon,
      title: "Write & Publish",
      content:
        "Create beautiful blog posts with our easy-to-use editor and publish them instantly.",
    },
    {
      id: 2,
      icon: RectangleGroupIcon,
      title: "Organized categories",
      content:
        "Browse blogs by category including Technology, Lifestyle, Business, and more.",
    },
    {
      id: 3,
      icon: AdjustmentsHorizontalIcon,
      title: "Manage & Control",
      content:
        "Full control over your posts with draft mode, editing, and publishing options.",
    },
  ];

  return (
    <>
      <Header
        onSignupClick={toggleSignup}
        isSignupOpen={isSignupOpen}
        isSigninOpen={isSigninOpen}
        onSigninClick={toggleSignin}
      />

      <div className="px-10 py-5 bg-gray-100">
        <h1 className="font-black text-center text-3xl pt-10 font-serif">
          Share your Findings with the World
        </h1>
        <p className="text-center mt-4 font-sans font-thin">
          Join our community of writers and readers. Create, publish, and
          discover amazing blog posts across various categories.
        </p>
        <div className="mt-5 flex space-x-4 justify-center mb-5">
          <Button
            variant="blue"
            className="hover:cursor-pointer"
            onClick={toggleSignup}
          >
            Get Started
          </Button>

          {isSignupOpen && (
            <Signup
              isSignupOpen={isSignupOpen}
              handleSignupToggle={toggleSignup}
              handleSigninToggle={toggleSignin}
            />
          )}

          <Button
            variant="outline"
            className="hover:cursor-pointer"
            onClick={toggleSignin}
          >
            Sign In
          </Button>

          {isSigninOpen && (
            <Signin
              isSigninOpen={isSigninOpen}
              handleSigninToggle={toggleSignin}
              handleSignupToggle={toggleSignup}
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 mt-10">
          {cardItems.map((card) => {
            const Icon = card.icon;

            return (
              <div
                className="bg-white rounded-2xl p-2 shadow-md hover:shadow-lg transition-shadow"
                key={card.id}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full mb-4 bg-blue-100 mx-auto">
                  <Icon className="size-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-center mb-2">
                  {card.title}
                </h4>
                <p className="font-thin text-gray-600 text-center text-sm">
                  {card.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
