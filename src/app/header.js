"use client";
import { useState } from 'react';
import Image from 'next/image';


export default function Header() {
    
    const [isOpen, setIsOpen] = useState(false);
    
    return(
        <header className="flex gap-2 pb-1 justify-around items-center border-b-2 border-pink-300 bg-gray-50 ">
            <div className="flex gap-2 justify-between mx-4 w-full">
                <h1 className="font-bold text-pink-400 text-2xl md:text-3xl flex items-center">Sakal Shop</h1>
                <input className="bg-gray-50 p-2 border-2 border-pink-300 hover:shadow-[0_0_20px_pink] rounded-lg" placeholder="Search Products ..."/>
                <Image src="/images/hamBurgerMenu.png" width={35} height={35} alt="Hamburger Menu Icon" onClick={() => setIsOpen(!isOpen)} className={`md:hidden cursor-pointer transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}/>
                <ul className="hidden md:flex gap-10 items-center text-pink-300 md:text-lg font-semibold cursor-pointer">
                    <li className="hover:text-pink-500"><a href='/'>Home</a></li>
                    <li className="hover:text-pink-500"><a href='/products'>Products</a></li>
                    <li className="hover:text-pink-500"><a href='/cart'>cart</a></li>
                </ul>
                {isOpen && (
                    <div className='border-2 border-pink-300 hover:shadow-[0_0_10px_pink] h-[40vh] w-[80vw] p-4 rounded-2xl bg-white absolute right-0'>
                        <h2 className='text-pink-400 text-2xl font-bold text-center my-6'>Pages Links</h2>
                        <hr className='text-pink-300'/>
                        <ul className="flex flex-col my-4 justify-center gap-3 items-center text-pink-300 font-semibold cursor-pointer">
                            <li className="hover:text-pink-500"><a href='/'>Home</a></li>
                            <li className="hover:text-pink-500"><a href='/products'>Products</a></li>
                            <li className="hover:text-pink-500"><a href='/cart'>cart</a></li>
                        </ul>    
                        <Image src="/images/hamBurgerMenu.png" width={35} height={35} alt="Hamburger Menu Icon" onClick={() => setIsOpen(!isOpen)} className={`md:hidden cursor-pointer transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"} absolute top-2 right-5`}/>
                    </div>
                )}
            </div>
        </header>
    );
}






