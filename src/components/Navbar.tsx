import { useState } from "react";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {data, status} = useSession()

  console.log("data, status", data, status)
  return (
    <div className="navbar">
      <Link className="navbar__logo" href="/">
        next map
      </Link>
      <ul className="navbar__list">
        <li className="navbar__list--item">
          <Link href="/stores">맛집 목록</Link>
        </li>
        <li className="navbar__list--item">
          <Link href="/stores/new">맛집 등록</Link>
        </li>
        <li className="navbar__list--item">
          <Link href="/users/likes">찜한 가게</Link>
        </li>
        
        <li className="navbar__list--item">
        {
          status === "authenticated" ? <button onClick={() => signOut({callbackUrl:"/"})}>로그아웃</button> : 
          <Link href="/api/auth/signin">로그인</Link>
        }
         
        </li>
      </ul>
      {/* 모바일 버튼 */}
      <button
        role="presentation"
        className="navbar__button"
        onClick={() => setIsOpen((val) => !val)}
      >
        {isOpen ? <IoClose /> : <IoMenu />}
      </button>
      {/* 모바일 네브바 */}
      {isOpen && (
        <div className="navbar--mobile">
          <ul className="navbar__list--mobile">
            <li className="navbar__list--item--mobile">
              <Link href="/stores">맛집 목록</Link>
            </li>
            <li className="navbar__list--item--mobile">
              <Link href="/stores/new">맛집 등록</Link>
            </li>
            <li className="navbar__list--item--mobile">
              <Link href="/users/likes">찜한 가게</Link>
            </li>
            <li className="navbar__list--item--mobile">
              <Link href="/api/auth/signin">로그인</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
