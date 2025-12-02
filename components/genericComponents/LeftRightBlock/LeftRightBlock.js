import React from "react";
import { storyblokEditable } from "@storyblok/react";
import css from "./LeftRightBlock.module.scss";
import { getDefaultStoryBlokImageSet } from "../../../functions/StoryBlokImageHelper";
import { RichTextToHTML } from "../../../functions/storyBlokRichTextRenderer";

export default function LeftRightBlock({ blok }) {
  const cssDirection = blok.direction === "imageright" ? "--reverse" : "";
  const size = blok.forWithPageNavigator ? "--with-navigator" : "";

  const colorTitle = blok.colorcode?.content?.title;
  const cssColorBg = colorTitle ? "--" + colorTitle : "";
  const cssColorFont = colorTitle ? "--highlighted-" + colorTitle : "";

  return (
    <section
      {...storyblokEditable(blok)}
      className={[css["highlighted-content" + size], css["highlighted-content"]].join(" ")}
    >
      <div
        className={[
          css["highlighted-content__image-container" + cssDirection + size],
          css["highlighted-content__image-container" + cssColorBg]
        ].join(" ")}
      >
        <div className={css["highlighted-content__image-responsive-wrapper"]}>
          {blok.image?.filename &&
            getDefaultStoryBlokImageSet(
              blok.image.filename,
              blok.image.alt,
              { largestImageWidth: 870, largestImageHeigth: 870 },
              850,
              css["highlighted-content__image"]
            )}
        </div>
      </div>

      <div className={css["highlighted-content__text-container" + cssDirection + size]}>
        {blok.text &&
          RichTextToHTML({
            document: blok.text,
            textClassName: css["highlighted-content__large-text" + size],
            boldClassName: css[
              "highlighted-content__large-text" + cssColorFont + size
            ]
          })}
      </div>
    </section>
  );
}
