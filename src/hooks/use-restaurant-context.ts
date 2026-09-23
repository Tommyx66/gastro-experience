"use client";

import {
  useSearchParams,
} from "next/navigation";

import {
  useMemo,
} from "react";

import {
  useGastro,
} from "@/context/gastro-context";

import type {
  GastroNiche,
  GastroPreset,
} from "@/config/presets/types";

import type {
  SiteConfig,
} from "@/config/site";

import type {
  MenuData,
} from "@/data/menu";

/* =========================================================
   RESTAURANT CONTEXT
   ========================================================= */

export interface RestaurantContext {
  /* -------------------------------------------------------
     Public / table mode
     ------------------------------------------------------- */

  mode:
    | "public"
    | "table";

  tableNumber:
    | string
    | null;

  isTableOrdersEnabled:
    boolean;

  /* -------------------------------------------------------
     Gastro engine
     ------------------------------------------------------- */

  preset:
    GastroPreset;

  niche:
    GastroNiche;

  config:
    SiteConfig;

  menu:
    MenuData;

  setNiche:
    (
      niche: GastroNiche,
    ) => void;
}

/* =========================================================
   HOOK
   ========================================================= */

export function useRestaurantContext(): RestaurantContext {
  const searchParams =
    useSearchParams();

  const rawMesa =
    searchParams.get(
      "mesa",
    );

  const {
    preset,
    niche,
    config,
    menu,
    setNiche,
  } = useGastro();

  const tableOrdersAllowed =
    config.features.tableOrders;

  return useMemo(() => {
    const tableNumber =
      rawMesa?.trim() || null;

    const mode =
      tableOrdersAllowed &&
      Boolean(tableNumber)
        ? "table"
        : "public";

    return {
      mode,

      tableNumber,

      isTableOrdersEnabled:
        tableOrdersAllowed,

      preset,

      niche,

      config,

      menu,

      setNiche,
    };
  }, [
    rawMesa,
    tableOrdersAllowed,
    preset,
    niche,
    config,
    menu,
    setNiche,
  ]);
}