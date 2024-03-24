"use client"
import profile from "../../assets/profile.png";
import  Image  from 'next/image'
import { FaHome } from "react-icons/fa";
import { MdPlaylistAddCheck } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { MdDownloadDone } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { IoIosHome } from "react-icons/io";
import Link from 'next/link';

function Sidebar() {
  return (
    <nav className="w-full xl:w-[20%] xl:h-full h-[150px] border rounded-md border-gray-300 bg-[#212121] flex flex-col justify-between text-[#6c7983]">
        <div className="m-8 py-4 px-3 relative rounded-md text-base text-[#6c7983] flex flex-row xl:flex-col gap-10 h-full">
            <div className="relative z-10 w-full flex justify-between items-center">
                <Image width={70} height={70} src={profile} alt="profile-image" />
                <div className="flex gap-2 items-center">
                  <Link href="/">
                    <div className="text-3xl cursor-pointer hover:text-indigo-600"> 
                      <IoIosHome />
                    </div>
                  </Link>
                  <Link href="/login">
                    <div className="text-3xl cursor-pointer hover:text-indigo-600"> 
                      <CiLogin />
                    </div>
                  </Link>
                </div>
            </div>
            <div className="w-full xl:mt-10 hidden lg:inline-flex">
              <ul className="w-full flex xl:flex-col gap-3">
                <li className="text-[#6c7983] text-lg flex justify-center items-center gap-3 w-full rounded-md hover:text-white cursor-pointer hover:bg-gray-600"><FaHome /> All Tasks</li>
                <li className="text-[#6c7983] text-lg flex justify-center items-center gap-3 w-full rounded-md hover:text-white cursor-pointer hover:bg-gray-600"><MdDownloadDone /> Completed</li>
                <li className="text-[#6c7983] text-lg flex justify-center items-center gap-3 w-full rounded-md hover:text-white cursor-pointer hover:bg-gray-600"><MdPlaylistAddCheck /> Important</li>
                <li className="text-[#6c7983] text-lg flex justify-center items-center gap-3 w-full rounded-md hover:text-white cursor-pointer hover:bg-gray-600"><FaClipboardList />Do it Now</li>
              </ul>
            </div>
        </div>
    </nav>
  )
}


export default Sidebar