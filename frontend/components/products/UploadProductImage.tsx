"use client";

import { uploadImage } from "@/actions/upload-image-action";
import { getImagePath } from "@/src/utils";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const UploadProductImage = ({
  currentImage,
}: {
  currentImage?: string;
}) => {
  const [image, setImage] = useState("");

  const onDrop = useCallback(async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    const image = await uploadImage(formData);
    setImage(image);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    isDragAccept,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    onDrop,
    maxFiles: 1,
  });

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Imagen Producto
        </label>
        <div
          {...getRootProps({
            className: `
            rounded-2xl border-2 border-dashed py-16 text-center transition-all duration-200
            ${isDragActive ? "border-primary bg-primary/10 text-primary" : "border-border/80 bg-card text-muted-foreground"}
            ${isDragReject ? "border-destructive bg-destructive/10 text-destructive" : "cursor-pointer hover:border-primary/40 hover:bg-muted/20"}
        `,
          })}
        >
          <input {...getInputProps()} />
          {isDragAccept && (
            <p className="text-sm font-bold uppercase tracking-wide">
              Suelta la imagen
            </p>
          )}
          {isDragReject && (
            <p className="text-sm font-bold uppercase tracking-wide">
              Archivo no válido
            </p>
          )}
          {!isDragActive && (
            <p className="text-sm font-semibold tracking-wide">
              Arrastra y suelta una imagen aquí
            </p>
          )}
        </div>
      </div>

      {image && (
        <div className="space-y-3 py-5">
          <p className="text-sm font-bold uppercase tracking-wide text-foreground">
            Imagen Producto
          </p>
          <div className="relative h-72 w-72 overflow-hidden rounded-2xl border border-border/70 shadow-[0_12px_28px_hsl(var(--foreground)/0.1)]">
            <Image
              src={image}
              alt="Imagen publicada"
              className="object-cover"
              fill
              sizes="max-width: 500px"
            />
          </div>
        </div>
      )}

      {currentImage && !image && (
        <div className="space-y-3 py-5">
          <p className="text-sm font-bold uppercase tracking-wide text-foreground">
            Imagen Actual
          </p>
          <div className="relative h-72 w-72 overflow-hidden rounded-2xl border border-border/70 shadow-[0_12px_28px_hsl(var(--foreground)/0.1)]">
            <Image
              src={getImagePath(currentImage)}
              alt="Imagen publicada"
              className="object-cover"
              fill
              sizes="max-width: 500px"
              unoptimized
            />
          </div>
        </div>
      )}

      <input
        type="hidden"
        name="image"
        defaultValue={image ? image : currentImage}
      />
    </>
  );
};
