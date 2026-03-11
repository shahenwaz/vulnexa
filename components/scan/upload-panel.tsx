import { FileUp, FolderSearch, Shield } from "lucide-react";

export function UploadPanel() {
  return (
    <div className="panel-glow space-y-6 p-6 md:p-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Upload project files
        </h2>
        <p className="text-sm leading-7 text-muted-foreground">
          Start with a zip archive or selected source files. Backend processing
          will be connected in the next development phase.
        </p>
      </div>

      <div className="rounded-3xl border border-dashed border-primary/30 bg-primary/5 p-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10">
          <FileUp className="size-6 text-primary" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Drag and drop files here</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Accepts source files and zip uploads for the future scan engine.
        </p>
        <button
          type="button"
          className="mt-5 rounded-2xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Choose files
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="panel-muted p-4">
          <div className="flex items-center gap-3">
            <FolderSearch className="size-5 text-accent" />
            <p className="font-medium">Planned scan scope</p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            JavaScript, TypeScript, Python, configuration files, and common web
            app source patterns.
          </p>
        </div>

        <div className="panel-muted p-4">
          <div className="flex items-center gap-3">
            <Shield className="size-5 text-primary" />
            <p className="font-medium">Planned result output</p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Severity breakdown, finding details, remediation guidance, and
            report-ready summaries.
          </p>
        </div>
      </div>
    </div>
  );
}
