// specificComponents/Restaurant.js
import React from "react";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function Restaurant({ blok }) {
  return (
    <div
      {...storyblokEditable(blok)}
      key={blok._uid}
      id={blok.component === "list" ? "restaurants-list" : undefined}
    >
      {blok.name && <h2>{blok.name}</h2>}

      {blok.image?.filename && (
        <img src={blok.image.filename} alt={blok.image.alt || ""} />
      )}

      {blok.description && <p>{blok.description}</p>}

      {blok.items &&
        blok.items.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </div>
  );
}
