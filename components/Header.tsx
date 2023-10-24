import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "@/common/logos/AcmeLogo";

export default function Header() {
  return (
    <Navbar className="dark" maxWidth="full">
      <NavbarBrand className="text-white">
        <AcmeLogo />
        <a className="font-bold text-inherit" href="/foodlist">
          HOME
        </a>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">ログアウト</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
