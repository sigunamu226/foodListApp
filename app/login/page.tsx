"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import SharkImage from "@/common/assets/images/shark.jpg";
import { login } from "@/services/supabase";
import { useRouter } from "next/navigation";

export default function Page(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onClick = () => {
    login(email, password, router);
  };

  return (
    <div className="bg-gradient-to-r from-cocoa to-ice h-screen">
      <div className="h-full flex justify-center items-center">
        <Card className="p-6 md:p-12">
          <CardHeader className="justify-center">
            <Image
              alt="Shark"
              className="object-cover rounded-xl w-52 md:w-72"
              src={SharkImage.src}
            />
          </CardHeader>
          <CardBody className="p-0 mt-5">
            <h1 className="text-2xl text-center">ログイン</h1>
            <div className="mt-4">
              <Input
                className="rounded-md p-2"
                placeholder="メールアドレス"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Input
                className="rounded-md p-2"
                placeholder="パスワード"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Button
                className="w-full rounded-md p-2 text-white"
                color="primary"
                onClick={onClick}
              >
                ログイン
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
