"use client";

import { FileUp, FolderSearch, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function UploadPanel() {
  return (
    <Tabs defaultValue="upload" className="w-full">
      <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="upload">Upload</TabsTrigger>
        <TabsTrigger value="details">Scan details</TabsTrigger>
      </TabsList>

      <TabsContent value="upload">
        <Card className="panel-glow">
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight">
              Upload project files
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-3xl border border-dashed border-primary/25 bg-primary/5 p-8 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                <FileUp className="size-6 text-primary" />
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                Drag and drop files here
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Accepts source files and zip uploads for the future scan engine.
              </p>

              <Button type="button" className="mt-5 rounded-2xl">
                Choose files
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="panel-muted border-border/60">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <FolderSearch className="size-5 text-accent" />
                    <p className="font-medium">Planned scan scope</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    JavaScript, TypeScript, Python, configuration files, and
                    common web app source patterns.
                  </p>
                </CardContent>
              </Card>

              <Card className="panel-muted border-border/60">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Shield className="size-5 text-primary" />
                    <p className="font-medium">Planned result output</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Severity breakdown, finding details, remediation guidance,
                    and report-ready summaries.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="details">
        <Card className="panel">
          <CardHeader>
            <CardTitle className="text-2xl tracking-tight">
              Scan configuration
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Project name</label>
              <Input placeholder="e.g. vulnexa-demo-app" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                placeholder="Add scan notes, project context, or assumptions for this review..."
                className="min-h-32"
              />
            </div>

            <Button className="rounded-2xl">Save scan details</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
