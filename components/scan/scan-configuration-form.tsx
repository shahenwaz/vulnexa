"use client";

import { useState } from "react";
import { Play, Shield, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { mockScanSessionPresets } from "@/lib/scan-session";
import type {
  ScanRunStatus,
  ScanSessionPreset,
  ScanTargetType,
} from "@/lib/types";

type ScanConfigurationFormProps = {
  value: ScanSessionPreset;
  onChange: (next: ScanSessionPreset) => void;
};

const targetOptions: { value: ScanTargetType; label: string }[] = [
  { value: "repository", label: "Repository URL" },
  { value: "upload", label: "Upload package" },
  { value: "folder", label: "Local folder" },
];

const statusOptions: { value: ScanRunStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "queued", label: "Queued" },
  { value: "running", label: "Running" },
  { value: "completed", label: "Completed" },
];

export function ScanConfigurationForm({
  value,
  onChange,
}: ScanConfigurationFormProps) {
  const [activePresetId, setActivePresetId] = useState(value.id);

  function applyPreset(preset: ScanSessionPreset) {
    setActivePresetId(preset.id);
    onChange(preset);
  }

  function updateField<K extends keyof ScanSessionPreset>(
    key: K,
    nextValue: ScanSessionPreset[K],
  ) {
    onChange({
      ...value,
      [key]: nextValue,
    });
  }

  return (
    <Card className="border-border/60 bg-card/70">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <Shield className="size-4" />
          <span className="text-sm font-medium">New scan flow</span>
        </div>

        <CardTitle className="text-2xl font-semibold tracking-tight">
          Configure a scan session
        </CardTitle>

        <p className="text-sm leading-6 text-muted-foreground">
          Set a target, choose the scan scope, and preview how the session will
          appear during your demo.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Sparkles className="size-4 text-primary" />
            Demo presets
          </div>

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {mockScanSessionPresets.map((preset) => {
              const isActive = preset.id === activePresetId;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={[
                    "rounded-2xl border px-4 py-3 text-left transition",
                    isActive
                      ? "border-primary/40 bg-primary/10"
                      : "border-border/60 bg-background/40 hover:border-primary/20 hover:bg-primary/5",
                  ].join(" ")}
                >
                  <p className="text-sm font-medium text-foreground">
                    {preset.label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {preset.status}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="projectName"
              className="text-sm font-medium text-foreground"
            >
              Project name
            </label>
            <Input
              id="projectName"
              value={value.projectName}
              onChange={(event) =>
                updateField("projectName", event.target.value)
              }
              placeholder="demo-ecommerce-app"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="scanStatus"
              className="text-sm font-medium text-foreground"
            >
              Session state
            </label>
            <select
              id="scanStatus"
              value={value.status}
              onChange={(event) =>
                updateField("status", event.target.value as ScanRunStatus)
              }
              className="flex h-10 w-full rounded-2xl border border-border/60 bg-background px-3 text-sm text-foreground outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Target type</p>

          <div className="grid gap-2 sm:grid-cols-3">
            {targetOptions.map((option) => {
              const isActive = value.targetType === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateField("targetType", option.value)}
                  className={[
                    "rounded-2xl border px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border/60 bg-background/40 text-muted-foreground hover:border-primary/20 hover:bg-primary/5 hover:text-foreground",
                  ].join(" ")}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="targetValue"
            className="text-sm font-medium text-foreground"
          >
            Target value
          </label>
          <Input
            id="targetValue"
            value={value.targetValue}
            onChange={(event) => updateField("targetValue", event.target.value)}
            placeholder="Repository URL, archive name, or folder path"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="notes"
            className="text-sm font-medium text-foreground"
          >
            Notes
          </label>
          <Textarea
            id="notes"
            value={value.notes ?? ""}
            onChange={(event) => updateField("notes", event.target.value)}
            placeholder="Optional scan context for the demo workflow"
            className="min-h-28"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Scan scope</p>

          <div className="grid gap-3 sm:grid-cols-3">
            <label className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/40 px-4 py-3">
              <input
                type="checkbox"
                checked={value.includeSecrets}
                onChange={(event) =>
                  updateField("includeSecrets", event.target.checked)
                }
                className="size-4 rounded border-border"
              />
              <span className="text-sm text-foreground">Secrets</span>
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/40 px-4 py-3">
              <input
                type="checkbox"
                checked={value.includeDependencies}
                onChange={(event) =>
                  updateField("includeDependencies", event.target.checked)
                }
                className="size-4 rounded border-border"
              />
              <span className="text-sm text-foreground">Dependencies</span>
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/40 px-4 py-3">
              <input
                type="checkbox"
                checked={value.includeConfiguration}
                onChange={(event) =>
                  updateField("includeConfiguration", event.target.checked)
                }
                className="size-4 rounded border-border"
              />
              <span className="text-sm text-foreground">Configuration</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-secondary/20 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              Ready for demo flow
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              This form updates the preview state now and can connect to backend
              execution later.
            </p>
          </div>

          <Button type="button" className="gap-2 rounded-2xl">
            <Play className="size-4" />
            Start scan
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
