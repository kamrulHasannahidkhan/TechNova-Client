"use client";
import { useEffect } from "react";
import { trackPixel } from "@/lib/pixel";

export default function PixelViewContent({ id, name, price }: { id: string; name: string; price: number }) {
  useEffect(() => {
    trackPixel("ViewContent", {
      content_ids: [id],
      content_name: name,
      content_type: "product",
      value: price,
      currency: "BDT",
    });
  }, [id, name, price]);

  return null;
}
