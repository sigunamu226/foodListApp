import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "@/common/logos/AcmeLogo";
import { useRouter } from "next/navigation";
import { logout } from "@/services/supabase";

export const Header: React.FC = () => {
  const router = useRouter();

  return (
    <Navbar className="dark" maxWidth="full">
      <NavbarBrand className="text-white">
        <AcmeLogo />
        <a className="font-bold text-inherit" href="/foodlist">
          HOME
        </a>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="flex">
          <Button variant="light" onClick={() => logout(router)}>
            ログアウト
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
