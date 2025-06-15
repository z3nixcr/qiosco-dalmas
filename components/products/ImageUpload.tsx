"use client";

import { getImagePath } from "@/src/utils";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";

export default function ImageUpload({
  image,
}: {
  image: string | undefined;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(
    null
  );

  return (
    <CldUploadWidget
      onSuccess={(result, { widget }) => {
        if (result.event === "success") {
          // @ts-ignore
          setImageUrl(result.info?.secure_url);
          widget.close();
        }
      }}
      uploadPreset="qioscoproduct"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label
              className="text-slate-800"
              htmlFor="image"
            >
              Imagen del Producto
            </label>
            <div
              onClick={() => open()}
              className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <PhotoIcon className="w-20 h-20 text-slate-500" />
              <p className="text-lg font-semibold">
                Agregar Imagen
              </p>
              {imageUrl && (
                <div className="mt-4 relative w-48 h-48 rounded-md overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt="Imagen del Producto"
                    style={{ objectFit: "contain" }}
                    fill
                    // sizes=""
                    // className="object-cover"
                  />
                </div>
              )}
            </div>

            {image && !imageUrl && (
              <div className="space-y-2">
                <label htmlFor="">Imagen Actual:</label>
                <div className="mt-4 relative w-48 h-48 rounded-md overflow-hidden space-y-2">
                  <Image
                    src={getImagePath(image)}
                    alt="Imagen del Producto"
                    style={{ objectFit: "contain" }}
                    fill
                  />
                </div>
              </div>
            )}

            <input
              id="image"
              type="hidden"
              name="image"
              defaultValue={imageUrl || image} // Ensure the input is controlled
            />
          </div>
        </>
      )}
    </CldUploadWidget>
  );
}
