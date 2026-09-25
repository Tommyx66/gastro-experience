import HomeClient from "./page-client";

import {
  DEFAULT_NICHE,
  isGastroNiche,
} from "@/config/presets";

import type { GastroNiche } from "@/config/presets/types";

type PageSearchParams = Promise<{
  type?: string | string[];
  [key: string]: string | string[] | undefined;
}>;

export default async function Home({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const params = await searchParams;
  const requested = Array.isArray(params.type) ? params.type[0] : params.type;
  const initialNiche: GastroNiche = isGastroNiche(requested)
    ? requested
    : DEFAULT_NICHE;

  return <HomeClient initialNiche={initialNiche} />;
}
