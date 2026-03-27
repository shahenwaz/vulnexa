"use client";

import { useRef, useState } from "react";
import { AlertCircle, FileArchive, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ZipUploadDropzoneProps = {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function isZipFile(file: File) {
  return (
    file.name.toLowerCase().endsWith(".zip") ||
    file.type === "application/zip" ||
    file.type === "application/x-zip-compressed"
  );
}

export function ZipUploadDropzone({
  file,
  onFileSelect,
  disabled = false,
}: ZipUploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  function handleIncomingFile(nextFile: File | null) {
    if (!nextFile) {
      setLocalError(null);
      onFileSelect(null);
      return;
    }

    if (!isZipFile(nextFile)) {
      setLocalError("Please upload a valid .zip file.");
      onFileSelect(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return;
    }

    setLocalError(null);
    onFileSelect(nextFile);
  }

  function handleRemove() {
    setLocalError(null);
    onFileSelect(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept=".zip,application/zip,application/x-zip-compressed"
        className="hidden"
        disabled={disabled}
        onChange={(event) =>
          handleIncomingFile(event.target.files?.[0] ?? null)
        }
      />

      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) {
            setIsDragging(true);
          }
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);

          if (disabled) return;

          handleIncomingFile(event.dataTransfer.files?.[0] ?? null);
        }}
        className={cn(
          "group w-full rounded-3xl border border-dashed px-6 py-10 text-left transition",
          "bg-card/60 cursor-pointer hover:border-primary/40 hover:bg-primary/5",
          isDragging && "border-primary bg-primary/10",
          disabled && "cursor-not-allowed opacity-70",
        )}
      >
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
            <Upload className="size-6" />
          </div>

          <div className="space-y-1">
            <p className="text-base font-semibold text-foreground">
              Drag and drop a ZIP file here
            </p>
            <p className="text-sm text-muted-foreground">
              Or click to browse and upload your project archive
            </p>
          </div>

          <div className="rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs text-muted-foreground">
            ZIP only
          </div>
        </div>
      </button>

      {localError ? (
        <div className="flex items-start gap-2 rounded-2xl border border-destructive/25 bg-destructive/10 p-3">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p className="text-xs text-destructive">{localError}</p>
        </div>
      ) : null}

      {file ? (
        <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-secondary/40 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FileArchive className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatBytes(file.size)}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemove}
            disabled={disabled}
            className="gap-2 cursor-pointer"
          >
            <X className="size-4" />
            Remove
          </Button>
        </div>
      ) : null}
    </div>
  );
}
