import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Logo() {
  return (
    <div className="relative h-10 w-auto flex items-center">
      <Image
        src={siteConfig.logo}
        alt={siteConfig.name}
        width={200}
        height={40}
        className="h-full w-auto object-contain"
        priority
      />
    </div>
  );
}
