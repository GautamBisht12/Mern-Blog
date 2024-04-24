import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const FooterComponent = () => {
  return (
    <>
      <Footer container className="border border-t-8 border-teal-500">
        <div className="w-full mx-auto max-w-7xl">
          <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mb-10 mt-5">
              <Link
                to="/"
                className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
              >
                <span className="px-2 rounded-lg py-1 bg-gradient-to-r from-[#6f34a7] to-[#FF6978] text-white">
                  BishtG's
                </span>
                Blog
              </Link>
            </div>
            <div className="font-semibold grid grid-cols-2 gap-3  sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="About" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://gautambishtportfolio.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    My Portfolio
                  </Footer.Link>
                  <Footer.Link
                    href="/about"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bisht's Blog
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow Us" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://github.com/GautamBisht12"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </Footer.Link>
                  <Footer.Link
                    href="https://www.linkedin.com/in/gautam-bisht-863225277/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linkdin
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div className="mt-5 sm:mt-0">
                <Footer.Title title="Legal" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Footer.Link>
                  <Footer.Link
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms & Conditions
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div>
            <Footer.Copyright
              className="text-2xl font-semibold"
              href="#"
              by="Bisht's blog"
              year={new Date().getFullYear()}
            />
            <div className="flex gap-6  mt-4 sm:justify-center">
              <Footer.Icon
                href="https://www.linkedin.com/in/gautam-bisht-863225277/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                icon={FaLinkedin}
              />
              <Footer.Icon
                href="https://github.com/GautamBisht12"
                icon={BsGithub}
              />
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default FooterComponent;
