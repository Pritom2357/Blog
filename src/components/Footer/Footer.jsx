import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="relative overflow-hidden py-10 bg-slate-200 border border-t-2 border-t-orange-600 ">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    &copy; Copyright 2023. All Rights Reserved by Pritom Biswas.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                                Tom Corp.
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium 
                                        duration-200 text-gray-900 hover:text-orange-600 hover:underline hover:underline-offset-8 decoration-orange-600"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium
                                        duration-200 text-gray-900 hover:text-orange-600 hover:underline hover:underline-offset-8 decoration-orange-600"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium 
                                        duration-200
                                        text-gray-900 hover:text-orange-600 hover:underline hover:underline-offset-8 decoration-orange-600"
                                        to="/"
                                    >
                                        Programs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium 
                                        duration-200
                                        text-gray-900 hover:text-orange-600 hover:underline hover:underline-offset-8 decoration-orange-600"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium
                                        duration-200 text-gray-900 hover:text-orange-600 hover:underline hover:underline-offset-8 decoration-orange-600"
                                        to="https://github.com/Pritom2357"
                                        target="_blank"
                                    >
                                        GitHub
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium
                                        duration-200 text-gray-900 hover:text-orange-600 hover:underline hover:underline-offset-8 decoration-orange-600"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium
                                        duration-200 text-gray-900 hover:text-orange-600 hover:underline hover:underline-offset-8 decoration-orange-600"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium
                                        duration-200 text-gray-900 hover:text-orange-600 hover:underline hover:underline-offset-8 decoration-orange-600"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium 
                                        duration-200
                                        text-gray-900 hover:text-orange-600 hover:underline hover:underline-offset-8 decoration-orange-600"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium
                                        duration-200 text-gray-900 hover:text-orange-600 hover:underline hover:underline-offset-8 decoration-orange-600"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium
                                        duration-200 text-gray-900 hover:text-orange-600 hover:underline hover:underline-offset-8 decoration-orange-600"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
  )
}

export default Footer