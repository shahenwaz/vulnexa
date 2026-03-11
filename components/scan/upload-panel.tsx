"use client";

import { FileUp, FolderSearch, Shield, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function UploadPanel() {
  return (
    <Tabs defaultValue="upload" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="upload">Upload</TabsTrigger>
        <TabsTrigger value="details">Scan details</TabsTrigger>
      </TabsList>

      <TabsContent value="upload" className="mt-0">
        <Card className="panel-glow rounded-3xl border-border/70">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl tracking-tight">
              Upload project files
            </CardTitle>
            <p className="text-sm leading-6 text-muted-foreground">
              Add your source code files here to prepare for the scan workflow.
              Backend analysis will be connected in the next development phase.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-3xl border border-dashed border-primary/25 bg-primary/5 p-8 text-center md:p-10">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                <FileUp className="size-7 text-primary" />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                Drag and drop files here
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Upload source files or zip archives to prepare a structured scan
                session for your application.
              </p>

              <Button type="button" className="mt-6 cursor-pointer rounded-2xl">
                Choose files
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="panel-muted rounded-2xl border-border/60">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <FolderSearch className="size-5 text-accent" />
                    <p className="font-medium">Planned scan scope</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    JavaScript, TypeScript, Python, configuration files, and
                    common web application source patterns.
                  </p>
                </CardContent>
              </Card>

              <Card className="panel-muted rounded-2xl border-border/60">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Shield className="size-5 text-primary" />
                    <p className="font-medium">Planned result output</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Severity breakdown, findings detail, remediation guidance,
                    and report-ready summaries.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/60 p-4">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 size-4 text-muted-foreground" />
                <p className="text-sm leading-6 text-muted-foreground">
                  This upload area is currently part of the frontend prototype.
                  File handling and scan execution will be connected once the
                  backend service is added.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="details" className="mt-0">
        <Card className="panel rounded-3xl border-border/70">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl tracking-tight">
              Scan configuration
            </CardTitle>
            <p className="text-sm leading-6 text-muted-foreground">
              Add a project name and notes so the scan session has better
              context when backend analysis is introduced.
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="project-name" className="text-sm font-medium">
                Project name
              </label>
              <Input id="project-name" placeholder="e.g. vulnexa-demo-app" />
            </div>

            <div className="space-y-2">
              <label htmlFor="scan-notes" className="text-sm font-medium">
                Notes
              </label>
              <Textarea
                id="scan-notes"
                placeholder="Add scan notes, project context, assumptions, or security focus areas for this review..."
                className="min-h-36"
              />
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-secondary/25 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Save scan preparation
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Store project details now and connect real scan execution
                  later.
                </p>
              </div>

              <Button className="cursor-pointer rounded-2xl">
                Save scan details
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
