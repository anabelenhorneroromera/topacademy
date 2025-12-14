import React from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
import { getDefaultStoryBlokImageSet } from "../../../functions/StoryBlokImageHelper";

export default function Restaurant({ blok }) {
  const title = typeof blok.title === "string" ? blok.title : "";

  return (
    <article {...storyblokEditable(blok)} style={{ marginBottom: "40px" }}>
      {/* Imagen */}
      {blok.image?.filename && (
        <div style={{ maxWidth: "900px" }}>
          {getDefaultStoryBlokImageSet(
            blok.image.filename,
            blok.image.alt || title,
            { largestImageWidth: 1200, largestImageHeigth: 800 },
            900,
            ""
          )}
        </div>
      )}

      {/* Título */}
      {title && <h2 style={{ verdana: "12px" }}>{title}</h2>}

      {/* Description (Richtext) */}
      {blok.description &&
        RichTextToHTML({
          document: blok.description,
          textClassName: "",
        })}

      {/* Additional blocks */}
      {Array.isArray(blok.additionalstuff) &&
        blok.additionalstuff.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </article>
  );
}
