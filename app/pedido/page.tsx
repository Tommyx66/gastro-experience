import { DEFAULT_NICHE, isGastroNiche } from "@/config/presets";

import type { GastroNiche } from "@/config/presets/types";

import OrderPageClient from "./page-client";

type SearchParams = Record<
  string,
  string | string[] | undefined
>;

type OrderPageProps = {
  searchParams: Promise<SearchParams>;
};

function resolveInitialNiche(
  value: SearchParams["type"],
): GastroNiche {
  const requested = Array.isArray(value)
    ? value[0]
    : value;

  return isGastroNiche(requested)
    ? requested
    : DEFAULT_NICHE;
}

export default async function OrderPage({
  searchParams,
}: OrderPageProps) {
  const resolvedSearchParams =
    await searchParams;

  const initialNiche =
    resolveInitialNiche(
      resolvedSearchParams.type,
    );

  return (
    <OrderPageClient
      initialNiche={initialNiche}
    />
  );
}