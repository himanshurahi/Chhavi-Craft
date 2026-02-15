"use client";

import { useState, useCallback, useRef } from "react";
import { useImageEditor, createValidatedImageURL } from "@ozdemircibaris/react-image-editor/core";
import { fabric } from "fabric";
import {
  RiImageAddLine,
  RiImageEditLine,
  RiText,
  RiZoomInLine,
  RiZoomOutLine,
  RiRefreshLine,
  RiDownloadLine,
  RiMapPinLine,
} from "react-icons/ri";

const TOOLBAR_BTN =
  "flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent)]/10 hover:border-[var(--accent)] transition-colors disabled:opacity-50 disabled:pointer-events-none";

const MAX_OVERLAY_SIZE = 220;

export default function PageDesigner() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [placeholderCount, setPlaceholderCount] = useState(1);
  const [addImageError, setAddImageError] = useState("");
  const [addingImage, setAddingImage] = useState(false);
  const [coordinates, setCoordinates] = useState<
    { type: string; label: string; x: number; y: number; width?: number; height?: number }[] | null
  >(null);
  const addImageInputRef = useRef<HTMLInputElement>(null);

  const editor = useImageEditor({
    imageUrl,
    defaultColor: "#b85c38",
    defaultStrokeWidth: 3,
    maxHistorySize: 50,
    blurIntensity: 20,
  });

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError("");
    if (!file) return;
    const { url, error } = createValidatedImageURL(file);
    if (!url) {
      setUploadError(error || "Invalid image file");
      return;
    }
    setImageUrl(url);
    setPlaceholderCount(1);
    e.target.value = "";
  }, []);

  const handleAddPlaceholder = useCallback(() => {
    editor.text.add(`Placeholder ${placeholderCount}`);
    setPlaceholderCount((c) => c + 1);
  }, [editor, placeholderCount]);

  const handleAddImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setAddImageError("");
      if (!file || !editor.canvas) return;
      const { url, error } = createValidatedImageURL(file);
      if (!url) {
        setAddImageError(error || "Invalid image file");
        e.target.value = "";
        return;
      }
      setAddingImage(true);
      fabric.Image.fromURL(
        url,
        (img: fabric.Image, isError?: boolean) => {
          setAddingImage(false);
          e.target.value = "";
          if (isError || !img || !editor.canvas) {
            setAddImageError("Failed to load image");
            if (url.startsWith("blob:")) URL.revokeObjectURL(url);
            return;
          }
          const canvas = editor.canvas!;
          const w = img.get("width") ?? 1;
          const h = img.get("height") ?? 1;
          const scale = Math.min(MAX_OVERLAY_SIZE / w, MAX_OVERLAY_SIZE / h, 1);
          img.scale(scale);
          const cw = canvas.getWidth() ?? 400;
          const ch = canvas.getHeight() ?? 400;
          img.set({
            left: (cw - (img.getScaledWidth() ?? 0)) / 2,
            top: (ch - (img.getScaledHeight() ?? 0)) / 2,
            originX: "left",
            originY: "top",
            selectable: true,
            evented: true,
            hasControls: true,
            hasBorders: true,
          });
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.requestRenderAll();
          editor.history.save();
          if (url.startsWith("blob:")) URL.revokeObjectURL(url);
        },
        { crossOrigin: "anonymous" }
      );
    },
    [editor]
  );

  const handleGetCoordinates = useCallback(() => {
    if (!editor.canvas) return;
    const objects = editor.canvas.getObjects();
    const originalImage = objects.find(
      (o) => (o as fabric.Object & { id?: string }).id === "originalImage"
    );
    const imageLeft = (originalImage?.left as number) ?? 0;
    const imageTop = (originalImage?.top as number) ?? 0;

    const items: { type: string; label: string; x: number; y: number; width?: number; height?: number }[] = [];
    for (const obj of objects) {
      const id = (obj as fabric.Object & { id?: string }).id;
      if (id === "originalImage") continue;
      const left = (obj.left as number) ?? 0;
      const top = (obj.top as number) ?? 0;
      const w = obj.getScaledWidth?.() ?? obj.get("width");
      const h = obj.getScaledHeight?.() ?? obj.get("height");
      const type = obj.type ?? "unknown";
      let label = "";
      if (type === "i-text" || type === "text") {
        label = (obj as fabric.IText).get("text") ?? "";
      } else if (type === "image") {
        label = "Image";
      } else {
        label = type;
      }
      items.push({
        type,
        label: label || `Item ${items.length + 1}`,
        x: Math.round(left - imageLeft),
        y: Math.round(top - imageTop),
        ...(w != null && h != null && { width: Math.round(w), height: Math.round(h) }),
      });
    }
    setCoordinates(items);
  }, [editor.canvas]);

  const handleSave = useCallback(async () => {
    if (!editor.hasImage) return;
    setSaving(true);
    try {
      const blob = await editor.exportToBlob();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `design-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setSaving(false);
    }
  }, [editor]);

  if (!imageUrl) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--card)]/50 p-8">
        <label className="flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-[var(--accent)] bg-[var(--accent)]/5 px-8 py-10 transition-colors hover:bg-[var(--accent)]/10">
          <RiImageAddLine className="h-14 w-14 text-[var(--accent)]" />
          <span className="text-lg font-medium text-[var(--foreground)]">
            Choose an image to design
          </span>
          <span className="text-sm text-[var(--muted)]">
            JPEG, PNG, GIF, WebP, BMP
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
        {uploadError && (
          <p className="mt-4 text-sm text-red-600 dark:text-red-400">{uploadError}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
        <button
          type="button"
          onClick={handleAddPlaceholder}
          className={TOOLBAR_BTN}
          title="Add placeholder text"
        >
          <RiText className="h-4 w-4" /> Add Placeholder
        </button>
        <input
          ref={addImageInputRef}
          type="file"
          accept="image/*"
          onChange={handleAddImage}
          className="hidden"
          aria-hidden
        />
        <button
          type="button"
          onClick={() => addImageInputRef.current?.click()}
          disabled={addingImage}
          className={TOOLBAR_BTN}
          title="Add image on top"
        >
          <RiImageEditLine className="h-4 w-4" /> {addingImage ? "Adding…" : "Add image"}
        </button>
        <div className="mx-1 h-6 w-px bg-[var(--border)]" />
        <button
          type="button"
          onClick={() => editor.zoom.out()}
          className={TOOLBAR_BTN}
          title="Zoom out"
        >
          <RiZoomOutLine className="h-4 w-4" />
        </button>
        <span className="min-w-[3rem] text-center text-sm text-[var(--muted)]">
          {Math.round(editor.zoom.level * 100)}%
        </span>
        <button
          type="button"
          onClick={() => editor.zoom.in()}
          className={TOOLBAR_BTN}
          title="Zoom in"
        >
          <RiZoomInLine className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.zoom.reset()}
          className={TOOLBAR_BTN}
          title="Reset zoom"
        >
          <RiRefreshLine className="h-4 w-4" /> Reset
        </button>
      </div>

      {addImageError && (
        <p className="text-sm text-red-600 dark:text-red-400">{addImageError}</p>
      )}

      {/* Canvas */}
      <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
        <div className="min-h-[400px] w-full overflow-auto rounded-lg bg-[var(--background)]">
          <canvas ref={editor.canvasRef} className="block" style={{ touchAction: "none" }} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-70"
        >
          <RiDownloadLine className="h-4 w-4" />
          {saving ? "Saving…" : "Download image"}
        </button>
        <button
          type="button"
          onClick={handleGetCoordinates}
          className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]"
          title="Get x, y coordinates of all placeholders and images"
        >
          <RiMapPinLine className="h-4 w-4" /> Get coordinates
        </button>
        <button
          type="button"
          onClick={() => {
            setImageUrl("");
            setUploadError("");
            setPlaceholderCount(1);
            setCoordinates(null);
          }}
          className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--border)]"
        >
          New image
        </button>
      </div>

      {coordinates && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
          <h3 className="mb-2 text-sm font-semibold text-[var(--foreground)]">
            Added items — x, y relative to image (padding excluded)
          </h3>
          <div className="max-h-64 overflow-auto">
            {coordinates.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">No placeholders or images added yet.</p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="py-2 pr-3 font-medium text-[var(--muted)]">#</th>
                    <th className="py-2 pr-3 font-medium text-[var(--muted)]">Type</th>
                    <th className="py-2 pr-3 font-medium text-[var(--muted)]">Label / Text</th>
                    <th className="py-2 pr-3 font-medium text-[var(--muted)]">x</th>
                    <th className="py-2 pr-3 font-medium text-[var(--muted)]">y</th>
                    <th className="py-2 pr-3 font-medium text-[var(--muted)]">width</th>
                    <th className="py-2 font-medium text-[var(--muted)]">height</th>
                  </tr>
                </thead>
                <tbody>
                  {coordinates.map((item, i) => (
                    <tr key={i} className="border-b border-[var(--border)] last:border-0">
                      <td className="py-2 pr-3 text-[var(--foreground)]">{i + 1}</td>
                      <td className="py-2 pr-3 text-[var(--foreground)]">{item.type}</td>
                      <td className="py-2 pr-3 text-[var(--foreground)]">{item.label}</td>
                      <td className="py-2 pr-3 text-[var(--foreground)]">{item.x}</td>
                      <td className="py-2 pr-3 text-[var(--foreground)]">{item.y}</td>
                      <td className="py-2 pr-3 text-[var(--foreground)]">
                        {item.width ?? "—"}
                      </td>
                      <td className="py-2 text-[var(--foreground)]">{item.height ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <pre className="mt-3 overflow-auto rounded bg-[var(--background)] p-3 text-xs text-[var(--muted)]">
            {JSON.stringify(coordinates, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
