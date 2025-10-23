import { BookOpenIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Signup } from "./Signup";
import { Signin } from "./Signin";

const Header = (props) => {
  const { onSignupClick, onSigninClick, isSignupOpen, isSigninOpen } = props;

  return (
    <>
    <div className="sticky top-0 z-50 relative md:px-5 px-2 py-3 flex justify-between border-b shadow-md shadow-gray-300 bg-[url('https://images.unsplash.com/photo-1631519952398-5b1d76b946e8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3BhcGVyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1000')]">
      <div className="absolute inset-0 bg-white/90"></div>
      <div className="relative flex justify-between w-full">
        <div className="flex items-center space-x-2">
          <BookOpenIcon className="size-6 text-blue-500" />
          <p className="text-xl font-black">BlogHub</p>
        </div>
        <div className="sm:space-x-5 space-x-2 flex">
          <Button
            variant="ghost"
            className="hover:cursor-pointer"
            onClick={onSigninClick}
            size="xs"
            textSize="xs"
          >
            Sign In
          </Button>
          <Button
            variant="blue"
            size="xs"
            textSize="xs"
            className="hover:cursor-pointer"
            onClick={onSignupClick}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>

    {isSignupOpen && <Signup />}
    {isSigninOpen && <Signin />}
    </>
  );
};

export default Header;
