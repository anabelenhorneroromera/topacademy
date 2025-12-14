import React from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";
import { getDefaultStoryBlokImageSet } from "../../../functions/StoryBlokImageHelper";
import css from "./Restaurants.module.scss";

export default function Restaurant({ blok }) {
  const title = typeof blok.title === "string" ? blok.title : "";

  return (
    <article {...storyblokEditable(blok)} className={css["restaurants-page"]}>
      
      {/* Imagen */}
      {blok.image?.filename && (
        <div className={css["restaurants-page__image"]}>
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
      {title && (
        <h2 className={css["restaurants-page__title"]}>
          {title}
        </h2>
      )}

      {/* Description */}
      {blok.description &&
        RichTextToHTML({
          document: blok.description,
          textClassName: css["restaurants-page__description"],
        })}

      {/* Additional blocks */}
      {Array.isArray(blok.additionalstuff) &&
        blok.additionalstuff.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </article>
  );
}

