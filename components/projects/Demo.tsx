import Preview from "./Preview";
import type { DemoSpec } from "@/lib/projects";

type DemoProps = DemoSpec & { accent?: "pink" | "mint" };

/**
 * The demo centerpiece. Supports a lazy iframe (live app), a video, an image,
 * or an asset-free placeholder. Pink-tinted frame signals "interactive".
 */
export default function Demo({
  type = "placeholder",
  src,
  poster,
  label,
  accent = "pink",
}: DemoProps) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-pink/25 bg-ink shadow-[0_8px_40px_rgba(255,61,129,0.08)]">
      <div className="relative aspect-[16/9] w-full">
        {type === "iframe" && src ? (
          <iframe
            src={src}
            title={label ?? "Project demo"}
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
            allow="fullscreen"
          />
        ) : type === "video" && src ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            src={src}
            poster={poster}
            controls
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : type === "image" && src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={label ?? "Project demo"}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Preview accent={accent} label={label} />
        )}
      </div>
    </div>
  );
}
